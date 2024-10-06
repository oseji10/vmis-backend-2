import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { PricelistService } from './pricelist.service';
import { Pricelist } from './pricelist.entity';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller('pricelists')
export class PricelistController {
  constructor(private readonly pricelistService: PricelistService,
    @InjectRepository(Pricelist)
    private readonly pricelistRepository: Repository<Pricelist>,
  ) {}
  @UseGuards(AuthGuard('session'))
  
  @Get()
  findAll() {
    return this.pricelistService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.pricelistService.findOne(id);
  // }

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


  // @Get(':id')
  // async getPricelist(@Param('id') id: string): Promise<Pricelist> {
  //   return this.pricelistService.getPricelistWithProducts(id);
  // }


  @Get(':id')
  async getPricelistWithProducts(@Param('id') id: string): Promise<Pricelist> {
    return this.pricelistService.findOneWithProducts(id);
  }

}
