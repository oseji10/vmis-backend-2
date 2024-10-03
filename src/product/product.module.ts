import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Supplier } from '../supplier/supplier.entity';
import { Manufacturer } from '../manufacturer/manufacturer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Supplier, Manufacturer])],
  providers: [ProductService],
  controllers: [ProductController]
})
export class ProductModule {}
