import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { ProductRequestItems } from './product_request_items.entity';
import { Supplier } from 'src/supplier/supplier.entity';
import { Manufacturer } from 'src/manufacturer/manufacturer.entity';
import { ProductRequest } from '../product_request/product_request.entity';
import { CreateProductRequestItemsDto } from './product_request_items.dto';
import { Stock } from '../stock/stock.entity';



@Injectable()
export class ProductRequestItemsService {
  constructor(
    @InjectRepository(ProductRequestItems)
    private productRequestItemsRepository: Repository<ProductRequestItems>,
    @InjectRepository(ProductRequest)
    private productRequestRepository: Repository<ProductRequest>,

    @InjectRepository(Stock)
    private stockRepository: Repository<Stock>,

  ) {}

//   findAll(): Promise<ProductRequestItems[]> {
//     return this.productrequestitemsRepository.find();
//   }


findAll(): Promise<ProductRequestItems[]> {
    return this.productRequestItemsRepository.find();
}


    // Fetch all items with the specified requestID
    findMany(requestID: string): Promise<ProductRequestItems[]> {
        return this.productRequestItemsRepository.find({ 
          where: { requestID: requestID },
          relations: ['product', 'productRequestId', 'productRequestId.hospital', 'product.supplier'],
          select: {
            product: {
              productName: true,
              shortName: true,
              productDescription: true,
              supplier:{
                shortName: true,
                supplierName: true
              }
            },
            productRequestId: {
              id: true, // Include the ID or other properties as needed
              hospital: {
                shortName: true,
                hospitalName: true,
              },
            },
          },
        });
      }



  findRequestByRequestID(requestID: string): Promise<ProductRequestItems[]> {
    return this.productRequestItemsRepository.find({
        where: { requestID },
        relations: ['product', 'productRequestId', 'productRequestId.hospital', 'product.supplier'],
        select: {
          product: {
            productName: true,
            shortName: true,
            productDescription: true,
            supplier:{
              shortName: true,
              supplierName: true
            }
          },
          productRequestId: {
            id: true, 
            hospital: {
              shortName: true,
              hospitalName: true,
            },
          },
        },
    });
}
      

    // Create a new product request item
    create(productrequestitems: ProductRequestItems): Promise<ProductRequestItems> {
        return this.productRequestItemsRepository.save(productrequestitems);
    }

    // Update an existing product request item
    // async update(id: string, productrequestitems: ProductRequestItems): Promise<ProductRequestItems> {
    //     await this.productRequestItemsRepository.update(id, productrequestitems);
    //     return this.findOne(id);
    // }

    


    // Fetch a single product request item by id
    findOne(id: string): Promise<ProductRequestItems> {
        return this.productRequestItemsRepository.findOne({ where: { id } });
    }


// ----------------------------------------------//
// Create A New Drug Request
// ----------------------------------------------//

// Generate random ID for request ID
  generateRequestId(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  // This is creates a new procurement request
  async createProductRequestWithItems(
  productRequestData: Partial<ProductRequest>,
  productRequestItemsData: Partial<ProductRequestItems[]>
): Promise<ProductRequest> {
  // Generate requestId
  const requestId = this.generateRequestId(10);

  // Create and save the ProductRequest
  const productRequest = this.productRequestRepository.create({
    ...productRequestData,
    requestID: requestId,
    status: "pending fulfilment",
  });

  // Save the ProductRequest entity
  const savedProductRequest = await this.productRequestRepository.save(productRequest);

  // Prepare ProductRequestItems data with the same requestId
  const productRequestItems = productRequestItemsData.map(item => {
    return this.productRequestItemsRepository.create({
      ...item,
      status: "requested",
      requestedDate: new Date(),
      requestID: requestId, // Store the same requestId in each ProductRequestItems
      productRequestId: savedProductRequest, // Optionally link to the saved ProductRequest
    });
  });

  // Save all the ProductRequestItems
  await this.productRequestItemsRepository.save(productRequestItems);

  // Return the saved ProductRequest with associated items
  return savedProductRequest;
}


// ----------------------------------------------//
// This Dispatches products
// ----------------------------------------------//
async dispatchProducts(id: string, productrequestitems: ProductRequestItems): Promise<ProductRequestItems> {
    // Set the dispatched date to now and update status
    const updatedData = {
        ...productrequestitems,
        dispatchedDate: new Date(), // Set to current date and time
        status: 'dispatched', // Set status to dispatched
    };

    // Perform the update
    await this.productRequestItemsRepository.update({ id }, updatedData);

    // Return the updated item by fetching the updated record
    return this.productRequestItemsRepository.findOne({ where: { id } });
}




// ----------------------------------------------//
// This Receives products to Stock
// ----------------------------------------------//
async receiveProductToStock(id: string, productrequestitems: ProductRequestItems): Promise<ProductRequestItems> {
   

    // Prepare the updated data with explicit values for receivedDate and status
    const updatedData = {
        receivedDate: new Date(), // Set to current date and time
        status: 'received', // Set status to 'received'
        // Include other properties if necessary
    };

    // Fetch the existing record to ensure it exists
    const existingItem = await this.productRequestItemsRepository.findOne({ where: { id } });
    if (!existingItem) {
        throw new Error('Product request item not found');
    }

    // Merge existing item with the new data (this will override receivedDate and status)
    const mergedData = {
        ...existingItem,
        ...updatedData,
    };

    // Use save to update the record
    const updatedProductRequestItem = await this.productRequestItemsRepository.save(mergedData);

  

    // Create a new record in the Stock table
    const stockData = {
        receivedDate: updatedProductRequestItem.receivedDate,
        quantityReceived: updatedProductRequestItem.quantityReceived, // Assuming this is a valid property
        requestID: updatedProductRequestItem.requestID,
        batchNumber: updatedProductRequestItem.batchNumber,
    };

    // Save the new stock record
    await this.stockRepository.save(stockData);

    // Return the updated ProductRequestItems record
    return updatedProductRequestItem;
}


    // Fetch a single product request item by id
    fetchProductRequestItem(id: string): Promise<ProductRequestItems> {
        return this.productRequestItemsRepository.findOne({ where: { id } });
    }

  async remove(id: string): Promise<void> {
    await this.productRequestItemsRepository.delete(id);
  }


}
