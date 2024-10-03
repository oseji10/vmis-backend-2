import { Module } from '@nestjs/common';
import { PricelistProductsService } from './pricelist_products.service';
import { PricelistProductsController } from './pricelist_products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PricelistProducts } from './pricelist_products.entity';
import { Supplier } from '../supplier/supplier.entity';
import { Manufacturer } from '../manufacturer/manufacturer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PricelistProducts, Supplier, Manufacturer])],
  providers: [PricelistProductsService],
  controllers: [PricelistProductsController]
})
export class PricelistProductsModule {}
