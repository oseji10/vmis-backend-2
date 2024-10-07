import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { SaleService } from './sale.service';
import { Sale } from './sale.entity';
import { AuthGuard } from '@nestjs/passport';
import { Transaction } from '../transaction/transaction.entity';
import { TransactionService } from '../transaction/transaction.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller('sales')
export class SaleController {
  constructor(private readonly saleService: SaleService,
    private readonly transactionService: TransactionService,
    @InjectRepository(Transaction) private readonly entityRepo: Repository<Transaction>,

  ) {}
  @UseGuards(AuthGuard('session'))
  
  @Get()
  findAll() {
    return this.saleService.findAll();
  }

  @Get(':transactionId')
findAllByTransactionId(@Param('transactionId') transactionId: string) {
    // if (!this.isValidUUID(transactionId)) {
    //     throw new BadRequestException('Invalid UUID format');
    // }
    return this.saleService.findAllByTransactionId(transactionId);
}

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.saleService.findOne(id);
  // }

//   @Post()
//   create(@Body() sale: Sale) {
//     return this.saleService.create(sale);
//   }

// Create a new procurement request
@Post('new-sale')
async createTransactionSales(
  @Body('transactionRequest') transactionData: Transaction,
  @Body('salesRequest') salesData: Sale[],
) {
  return this.saleService.createTransactionSales(transactionData, salesData);
}

  // @Put(':id')
  // update(@Param('id') id: string, @Body() sale: Sale) {
  //   return this.saleService.update(id, sale);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.saleService.remove(id);
  }
}
