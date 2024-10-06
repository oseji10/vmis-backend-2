import { Module } from '@nestjs/common';
import { ProductRequestItemsService } from './product_request_items.service';
import { ProductRequestItemsController } from './product_request_items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRequest } from '../product_request/product_request.entity';
import { ProductRequestItems } from './product_request_items.entity';
import { ProductRequestController } from 'src/product_request/product_request.controller';
import { Stock } from '../stock/stock.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductRequest, ProductRequestItems, Stock])],
  providers: [ProductRequestItemsService],
  controllers: [ProductRequestItemsController]
})
export class ProductRequestItemsModule {}
