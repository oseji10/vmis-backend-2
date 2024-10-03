import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PricelistProducts } from './pricelist_products.entity';
import { Supplier } from 'src/supplier/supplier.entity';
import { Manufacturer } from 'src/manufacturer/manufacturer.entity';
import * as XLSX from 'xlsx';

@Injectable()
export class PricelistProductsService {
  constructor(
    @InjectRepository(PricelistProducts)
    private pricelistproductsRepository: Repository<PricelistProducts>,

    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,

    @InjectRepository(Manufacturer)
    private manufacturerRepository: Repository<Manufacturer>,
  ) {}

//   findAll(): Promise<PricelistProducts[]> {
//     return this.pricelistproductsRepository.find();
//   }


findAll(): Promise<PricelistProducts[]> {
    return this.pricelistproductsRepository.find({
        relations: ['product', 'pricelist'], 
        select: {
            productId: {
                shortName: true,
                productName: true,
            },
            pricelistId: {
                pricelistId: true,
                pricelistName: true,
            },
        },
    });
}


  findOne(id: string): Promise<PricelistProducts> {
    return this.pricelistproductsRepository.findOne({ where: { id }});
  }

  create(pricelistproducts: PricelistProducts): Promise<PricelistProducts> {
    return this.pricelistproductsRepository.save(pricelistproducts);
  }

  async update(id: string, pricelistproducts: PricelistProducts): Promise<PricelistProducts> {
    await this.pricelistproductsRepository.update(id, pricelistproducts);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.pricelistproductsRepository.delete(id);
  }


  parseExcel(buffer: Buffer) {
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    return XLSX.utils.sheet_to_json(sheet);
  }
}
