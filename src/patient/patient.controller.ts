import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { PatientService } from './patient.service';
import { Patient } from './patient.entity';
import { CreatePatientDto } from './patient.dto';

@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Get()
  findAll() {
    return this.patientService.findAll();
  }

  @Get('/find/:id')
  findOneByContactInfo(@Param('id') phoneNumber: string, email: string) {
    return this.patientService.findOneByContactInfo(phoneNumber, email);
  }

  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.createPatientWithUser(createPatientDto);
  }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() patient: Patient) {
  //   return this.patientService.update(id, patient);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientService.remove(id);
  }
}
