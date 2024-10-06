import { Module } from '@nestjs/common';
import { PricelistService } from './pricelist.service';
import { PricelistController } from './pricelist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pricelist } from './pricelist.entity';
import { Supplier } from '../supplier/supplier.entity';
import { Manufacturer } from '../manufacturer/manufacturer.entity';
import { PricelistProductsModule } from '../pricelist_products/pricelist_products.module';

@Module({
  imports: [TypeOrmModule.forFeature([Pricelist, Supplier, Manufacturer, PricelistProductsModule])],
  providers: [PricelistService],
  controllers: [PricelistController]
})
export class PricelistModule {}
