import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { Supplier } from 'src/supplier/supplier.entity';
import { Manufacturer } from 'src/manufacturer/manufacturer.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,

    @InjectRepository(Manufacturer)
    private manufacturerRepository: Repository<Manufacturer>,
  ) {}

//   findAll(): Promise<Product[]> {
//     return this.productRepository.find();
//   }


findAll(): Promise<Product[]> {
    return this.productRepository.find({
        relations: ['supplier', 'manufacturer'], 
        select: {
            supplier: {
                shortName: true,
                supplierName: true,
            },
            manufacturer: {
                shortName: true,
                manufacturerName: true,
            },
        },
    });
}


  findOne(id: string): Promise<Product> {
    return this.productRepository.findOne({ where: { id }});
  }

  findProductsBySupplier(supplierId: string): Promise<Product[]> {
    return this.productRepository.find({
        where: { supplier: { id: supplierId } },
    });
}



  create(product: Product): Promise<Product> {
    return this.productRepository.save(product);
  }

  async update(id: string, product: Product): Promise<Product> {
    await this.productRepository.update(id, product);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }
}
