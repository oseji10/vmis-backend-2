import { Module } from '@nestjs/common';
import { ProductRequestService } from './product_request.service';
import { ProductRequestController } from './product_request.controller';

@Module({
  providers: [ProductRequestService],
  controllers: [ProductRequestController]
})
export class ProductRequestModule {}
