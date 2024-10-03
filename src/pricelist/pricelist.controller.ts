import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { PricelistService } from './pricelist.service';
import { Pricelist } from './pricelist.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('pricelists')
export class PricelistController {
  constructor(private readonly pricelistService: PricelistService) {}
  @UseGuards(AuthGuard('session'))
  
  @Get()
  findAll() {
    return this.pricelistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pricelistService.findOne(id);
  }

  @Post()
  create(@Body() pricelist: Pricelist) {
    return this.pricelistService.create(pricelist);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() pricelist: Pricelist) {
    return this.pricelistService.update(id, pricelist);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pricelistService.remove(id);
  }
}
