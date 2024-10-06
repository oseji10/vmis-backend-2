import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { StockService } from './stock.service';
import { Stock } from './stock.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('stocks')
export class StockController {
  constructor(private readonly stockService: StockService) {}
  @UseGuards(AuthGuard('session'))
  
  @Get()
  findAll() {
    return this.stockService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockService.findOne(id);
  }

  @Post()
  create(@Body() stock: Stock) {
    return this.stockService.create(stock);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() stock: Stock) {
    return this.stockService.update(id, stock);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockService.remove(id);
  }
}
