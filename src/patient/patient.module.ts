import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { Patient } from './patient.entity';
import { User } from '../users/users.entity';
import { Disease } from '../disease/disease.entity';
import { Hospital } from '../hospital/hospital.entity';
import { State } from '../state/state.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Patient, User, Disease, Hospital, State])],
  providers: [PatientService],
  controllers: [PatientController],
})
export class PatientModule {}
