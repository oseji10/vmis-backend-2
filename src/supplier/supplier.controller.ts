import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { Supplier } from './supplier.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('suppliers')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}
  @UseGuards(AuthGuard('session'))
  
  @Get()
  findAll() {
    return this.supplierService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supplierService.findOne(id);
  }

  @Post()
  create(@Body() supplier: Supplier) {
    return this.supplierService.create(supplier);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() supplier: Supplier) {
    return this.supplierService.update(id, supplier);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.supplierService.remove(id);
  }
}
