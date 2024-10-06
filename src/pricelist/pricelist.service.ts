import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pricelist } from './pricelist.entity';
import { Supplier } from 'src/supplier/supplier.entity';
import { Manufacturer } from 'src/manufacturer/manufacturer.entity';
import { PricelistProducts } from 'src/pricelist_products/pricelist_products.entity';

@Injectable()
export class PricelistService {
  constructor(
    @InjectRepository(Pricelist)
    private pricelistRepository: Repository<Pricelist>,

    // @InjectRepository(PricelistProducts)
    // private pricelistproductsRepository: Repository<PricelistProducts>,

    @InjectRepository(Manufacturer)
    private manufacturerRepository: Repository<Manufacturer>,
  ) {}

  findAll(): Promise<Pricelist[]> {
    return this.pricelistRepository.find();
  }


// findAll(): Promise<Pricelist[]> {
//     return this.pricelistRepository.find({
//         relations: ['supplier', 'manufacturer'], 
//         select: {
//             supplier: {
//                 shortName: true,
//                 supplierName: true,
//             },
//             manufacturer: {
//                 shortName: true,
//                 manufacturerName: true,
//             },
//         },
//     });
// }


  findOne(id: string): Promise<Pricelist> {
    return this.pricelistRepository.findOne({ where: { id }, relations: ['pricelist_products']});
  }

  create(pricelist: Pricelist): Promise<Pricelist> {
    return this.pricelistRepository.save(pricelist);
  }

  async update(id: string, pricelist: Pricelist): Promise<Pricelist> {
    await this.pricelistRepository.update(id, pricelist);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.pricelistRepository.delete(id);
  }



    // Fetch a pricelist by its ID and include all related pricelist products
    async findOneWithProducts(id: string): Promise<Pricelist> {
      return this.pricelistRepository.findOne({
        where: { id },
        relations: ['pricelist_products', 'pricelist_products.productId'],
        // select:{
        //   id: true,
          
        // }
      });
    }





    // async findOneWithProducts(pricelistId: string): Promise<Pricelist> {
    //   const pricelist = await this.pricelistRepository.findOne({
    //     where: { id: pricelistId },
    //     relations: ['pricelist_products'], // Eager loading related products
    //   });
  
    //   if (!pricelist) {
    //     throw new Error('Pricelist not found');
    //   }
  
    //   return pricelist;
    // }


    // async findOneWithProducts(pricelistId: string): Promise<Pricelist> {
    //   const pricelist = await this.pricelistRepository.findOne({
    //     where: { id: pricelistId},
    //     relations: ['pricelist_products'], // Ensure this matches the relationship name
    //   });
    
    //   if (!pricelist) {
    //     throw new Error('Pricelist not found');
    //   }
    
    //   return pricelist;
    // }
    
}
