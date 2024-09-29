import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { HospitalService } from './hospital.service';
import { Hospital } from './hospital.entity';

@Controller('hospitals')
export class HospitalController {
  constructor(private readonly hospitalService: HospitalService) {}

  @Get()
  findAll() {
    return this.hospitalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.hospitalService.findOne(id);
  }

  @Post()
  create(@Body() hospital: Hospital) {
    return this.hospitalService.create(hospital);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() hospital: Hospital) {
    return this.hospitalService.update(id, hospital);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.hospitalService.remove(id);
  }
}
