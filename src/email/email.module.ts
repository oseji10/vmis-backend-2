import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';

@Module({
//   imports: [TypeOrmModule.forFeature([Email, Supplier, Manufacturer, PricelistProductsModule])],
  providers: [EmailService],
  controllers: [EmailController]
})
export class EmailModule {}
