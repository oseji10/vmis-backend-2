import { Module } from '@nestjs/common';
import { ProductRequestService } from './product_request.service';
import { ProductRequestController } from './product_request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRequest } from './product_request.entity';
import { ProductRequestItems } from '../request/product_request_items.entity';
import { ProductRequestItemsController } from '../request/product_request_items.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductRequest, ProductRequestItems])],
  providers: [ProductRequestService],
  controllers: [ProductRequestController]
})
export class ProductRequestModule {}
