import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HospitalService } from './hospital.service';
import { HospitalController } from './hospital.controller';
import { Hospital } from './hospital.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hospital])],
  providers: [HospitalService],
  controllers: [HospitalController],
})
export class HospitalModule {}
