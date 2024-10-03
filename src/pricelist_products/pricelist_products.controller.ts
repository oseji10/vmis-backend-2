import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PricelistProductsService } from './pricelist_products.service';
import { PricelistProducts } from './pricelist_products.entity';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express'; 
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller('pricelist_products')
export class PricelistProductsController {
  constructor(private readonly pricelistproductsService: PricelistProductsService,
    @InjectRepository(PricelistProducts) private readonly entityRepo: Repository<PricelistProducts>,
  ) {}
  @UseGuards(AuthGuard('session'))
  
  @Get()
  findAll() {
    return this.pricelistproductsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pricelistproductsService.findOne(id);
  }

  @Post()
  create(@Body() pricelistproducts: PricelistProducts) {
    return this.pricelistproductsService.create(pricelistproducts);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() pricelistproducts: PricelistProducts) {
    return this.pricelistproductsService.update(id, pricelistproducts);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pricelistproductsService.remove(id);
  }


  @Post('upload_file')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const data = this.pricelistproductsService.parseExcel(file.buffer);
    await this.entityRepo.save(data);
    return { message: 'Data uploaded successfully' };
  }
}
