import { Module } from '@nestjs/common';
import { PricelistService } from './pricelist.service';
import { PricelistController } from './pricelist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pricelist } from './pricelist.entity';
import { Supplier } from '../supplier/supplier.entity';
import { Manufacturer } from '../manufacturer/manufacturer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pricelist, Supplier, Manufacturer])],
  providers: [PricelistService],
  controllers: [PricelistController]
})
export class PricelistModule {}
