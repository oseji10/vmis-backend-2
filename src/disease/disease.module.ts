import { Module } from '@nestjs/common';
import { DiseaseService } from './disease.service';
import { DiseaseController } from './disease.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Disease } from './disease.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Disease])],
  providers: [DiseaseService],
  controllers: [DiseaseController]
})
export class DiseaseModule {}
