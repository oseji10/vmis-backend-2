import { Module } from '@nestjs/common';
import { ProductPricingService } from './product_pricing.service';
import { ProductPricingController } from './product_pricing.controller';

@Module({
  providers: [ProductPricingService],
  controllers: [ProductPricingController]
})
export class ProductPricingModule {}
