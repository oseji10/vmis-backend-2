import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { PharmacistService } from './pharmacist.service';
import { Pharmacist } from './pharmacist.entity';
import { AuthGuard } from '@nestjs/passport';
import { CreatePharmacistDto } from './pharmacist.dto';

@Controller('pharmacists')
export class PharmacistController {
  constructor(private readonly pharmacistService: PharmacistService) {}
  @UseGuards(AuthGuard('session'))
  
  @Get()
  findAll() {
    return this.pharmacistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pharmacistService.findOne(id);
  }

  @Post()
  create(@Body() createPharmacistDto: CreatePharmacistDto) {
    return this.pharmacistService.createPharmacistWithUser(createPharmacistDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() pharmacist: Pharmacist) {
    return this.pharmacistService.update(id, pharmacist);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pharmacistService.remove(id);
  }
}
