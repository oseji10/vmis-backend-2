import { Module } from '@nestjs/common';
import { SaleService } from './sale.service';
import { SaleController } from './sale.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from './sale.entity';
import { Transaction } from '../transaction/transaction.entity';
import { TransactionService } from '../transaction/transaction.service';
import { PricelistProducts } from 'src/pricelist_products/pricelist_products.entity';
import { Stock } from '../stock/stock.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sale, Transaction, PricelistProducts, Stock])],
  providers: [SaleService, TransactionService, PricelistProducts],
  controllers: [SaleController]
})
export class SaleModule {}
