import { Module } from '@nestjs/common';
import { PharmacistService } from './pharmacist.service';
import { PharmacistController } from './pharmacist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/users.entity';
import { Hospital } from '../hospital/hospital.entity';
import { Pharmacist } from './pharmacist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pharmacist, User, Hospital])],
  providers: [PharmacistService],
  controllers: [PharmacistController]
})
export class PharmacistModule {}
