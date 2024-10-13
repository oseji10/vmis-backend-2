import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { Transaction } from './transaction.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}
  @UseGuards(AuthGuard('session'))
  
  @Get()
  findAll() {
    return this.transactionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(id);
  }

  @Post()
  create(@Body() transaction: Transaction) {
    return this.transactionService.create(transaction);
  }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() transaction: Transaction) {
  //   return this.transactionService.update(id, transaction);
  // }

  @Post('/confirm-payment/')
async markTransactionAsPaid(@Body('id') id: string): Promise<Transaction> {
  return this.transactionService.markAsPaid(id);
}


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionService.remove(id);
  }
}
