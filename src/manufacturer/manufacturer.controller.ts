import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { ManufacturerService } from './manufacturer.service';
import { Manufacturer } from './manufacturer.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('manufacturers')
export class ManufacturerController {
  constructor(private readonly manufacturerService: ManufacturerService) {}
  @UseGuards(AuthGuard('session'))
  
  @Get()
  findAll() {
    return this.manufacturerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.manufacturerService.findOne(id);
  }

  @Post()
  create(@Body() manufacturer: Manufacturer) {
    return this.manufacturerService.create(manufacturer);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() manufacturer: Manufacturer) {
    return this.manufacturerService.update(id, manufacturer);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.manufacturerService.remove(id);
  }
}
