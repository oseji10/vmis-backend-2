import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { PatientService } from './patient.service';
import { Patient } from './patient.entity';

@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Get()
  findAll() {
    return this.patientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.patientService.findOne(id);
  }

  @Post()
  create(@Body() patient: Patient) {
    return this.patientService.create(patient);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() patient: Patient) {
    return this.patientService.update(id, patient);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.patientService.remove(id);
  }
}
