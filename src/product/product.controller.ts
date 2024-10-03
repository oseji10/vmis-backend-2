import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('drugs')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @UseGuards(AuthGuard('session'))
  
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Post()
  create(@Body() product: Product) {
    return this.productService.create(product);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() product: Product) {
    return this.productService.update(id, product);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
