import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pricelist } from './pricelist.entity';
import { Supplier } from 'src/supplier/supplier.entity';
import { Manufacturer } from 'src/manufacturer/manufacturer.entity';

@Injectable()
export class PricelistService {
  constructor(
    @InjectRepository(Pricelist)
    private pricelistRepository: Repository<Pricelist>,

    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,

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
    return this.pricelistRepository.findOne({ where: { id }});
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
}
