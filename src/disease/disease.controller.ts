import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { DiseaseService } from './disease.service';
import { Disease } from './disease.entity';

@Controller('diseases')
export class DiseaseController {
  constructor(private readonly diseaseService: DiseaseService) {}

  @Get()
  findAll() {
    return this.diseaseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.diseaseService.findOne(id);
  }

  @Post()
  create(@Body() disease: Disease) {
    return this.diseaseService.create(disease);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() disease: Disease) {
    return this.diseaseService.update(id, disease);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.diseaseService.remove(id);
  }
}
