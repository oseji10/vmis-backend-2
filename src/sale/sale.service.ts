import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { Sale } from './sale.entity';
import { Product } from '../product/product.entity';
import { Transaction } from '../transaction/transaction.entity';
import { PricelistProducts } from '../pricelist_products/pricelist_products.entity';
import { Stock } from '../stock/stock.entity';

@Injectable()
export class SaleService {
  constructor(
    @InjectRepository(Sale)
    private saleRepository: Repository<Sale>,
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    @InjectRepository(PricelistProducts)
    private pricelistRepository: Repository<PricelistProducts>,

    @InjectRepository(Stock)
    private stockRepository: Repository<Stock>,
  ) {}

  findAll(): Promise<Sale[]> {
    return this.saleRepository.find({relations:['product'],
        // select:{
        //     productId:{
        //         shortName: true,
        //         productName: true,
        //         productDescription: true
        //     }
        // }
    });
  }

  // findOne(id: string): Promise<Sale> {
  //   return this.saleRepository.findOne({ where: { id }});
  // }

//   findAllByTransactionId(transactionId: string): Promise<Sale[]> {
//     return this.saleRepository.find({ where: {id: transactionId } }); // Adjust based on your actual field
// }


findAllByTransactionId(transactionId: string): Promise<Sale[]> {
  return this.saleRepository.find({ 
    where: { transaction: { id: transactionId } },
    relations: ['product'],
    // select: {
    //   product: {
    //     productName: true,
    //     shortName: true,
    //     productDescription: true,
    //     supplier:{
    //       shortName: true,
    //       supplierName: true
    //     }
    //   },
    //   productRequestId: {
    //     id: true, // Include the ID or other properties as needed
    //     hospital: {
    //       shortName: true,
    //       hospitalName: true,
    //     },
    //   },
    // },
  });
}


//   create(sale: Sale): Promise<Sale> {
//     return this.saleRepository.save(sale);
//   }


// Generate random ID for request ID
generateRequestId(length: number): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const characters = letters + numbers;

    // Ensure at least one letter and one number
    let result = '';
    result += letters.charAt(Math.floor(Math.random() * letters.length)); // add a random letter
    result += numbers.charAt(Math.floor(Math.random() * numbers.length)); // add a random number

    const charactersLength = characters.length;
    for (let i = 2; i < length; i++) { // Start from 2 to ensure 2 characters are already added
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    
    return result;
}

// This creates a new transaction request
async createTransactionSales(
  transactionData: Partial<Transaction>,
  salesData: Partial<Sale[]>
): Promise<Transaction> {
  // Generate requestId
  const transactionId = this.generateRequestId(10);

  // Initialize amount variable
  let totalAmount = 0;

  // Prepare Sales data with the same transactionId
  const salesRequest = [];

  // Start a transaction block
  return await this.stockRepository.manager.transaction(async (entityManager) => {
    for (const item of salesData) {
      // Fetch the product price using the product ID from the item
      const product = await this.pricelistRepository.findOne({
        where: { productId: { id: item.product.id } },
      });

      if (!product) {
        throw new Error(`Product with ID ${item.product.id} not found`);
      }

      // Calculate the amount for the current sale
      const saleAmount =
        (+product.landedCost || 0) +
        (+product.hospitalMarkup || 0) +
        (+product.supplierMarkup || 0) +
        (+product.consultantMarkup || 0) +
        (+product.bankCharges || 0) +
        (+product.otherCharges || 0);

      // Accumulate the total amount
      totalAmount += saleAmount * item.quantitySold;

      // Fetch all stocks sorted by expiry date to get the earliest stock first
      const availableStocks = await this.stockRepository.find({
        where: {
          productId: product.productId,
          quantityReceived: MoreThan(item.quantitySold),
        },
        order: {
          expiryDate: 'ASC', // Get the stock with the least shelf life first
        },
      });

      if (availableStocks.length === 0) {
        throw new Error(`Stock not found or insufficient stock for product ID ${item.product.id}`);
      }

      let quantityToSell = item.quantitySold; // Track how much we need to sell

      // Process each stock batch until the required quantity is sold
      for (const stock of availableStocks) {
        if (quantityToSell <= 0) break; // Stop if we've sold everything

        const availableStockQuantity = stock.quantityReceived - stock.quantitySold;

        // Determine how much can be sold from this batch
        const soldFromThisBatch = Math.min(availableStockQuantity, quantityToSell);

        // Update the stock's quantitySold
        stock.quantitySold += soldFromThisBatch;
        quantityToSell -= soldFromThisBatch; // Decrease the remaining quantity to sell

        // Save the updated stock entity
        await entityManager.save(stock);
      }

      if (quantityToSell > 0) {
        throw new Error(`Insufficient stock for product ID ${item.product.id}`);
      }

      // Create the Sale entity without linking the transaction yet
      const sale = this.saleRepository.create({
        ...item,
        saleId: transactionId,
        landedCost: product.landedCost,
        hospitalMarkup: product.hospitalMarkup,
        supplierMarkup: product.supplierMarkup,
        consultantMarkup: product.consultantMarkup,
        bankCharges: product.bankCharges,
        otherCharges: product.otherCharges,
      });

      salesRequest.push(sale);
    }

    // Create and save the Transaction with the calculated amount
    const transactionRequest = this.transactionRepository.create({
      ...transactionData,
      transactionId: transactionId,
      amount: totalAmount,
    });

    // Save the Transaction entity
    const savedTransactionRequest = await this.transactionRepository.save(transactionRequest);

    // Now link the saved transaction to each sale
    for (const sale of salesRequest) {
      sale.transaction = savedTransactionRequest; // Associate the saved transaction
    }

    // Save all the Sales Items
    await this.saleRepository.save(salesRequest);

    // Return the saved Transaction with associated items (if needed)
    return savedTransactionRequest; // Ensure to return the transaction
  });
}





  // async update(id: string, sale: Sale): Promise<Sale> {
  //   await this.saleRepository.update(id, sale);
  //   return this.findOne(id);
  // }

  async remove(id: string): Promise<void> {
    await this.saleRepository.delete(id);
  }
}
