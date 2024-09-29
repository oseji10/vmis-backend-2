import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hospital } from './hospital.entity';

@Injectable()
export class HospitalService {
  constructor(
    @InjectRepository(Hospital)
    private hospitalRepository: Repository<Hospital>,
  ) {}

  findAll(): Promise<Hospital[]> {
    return this.hospitalRepository.find({ relations: ['patients'] });
  }

  findOne(id: number): Promise<Hospital> {
    return this.hospitalRepository.findOne({ where: { id }, relations: ['patients'] });
  }

  create(hospital: Hospital): Promise<Hospital> {
    return this.hospitalRepository.save(hospital);
  }

  async update(id: number, hospital: Hospital): Promise<Hospital> {
    await this.hospitalRepository.update(id, hospital);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.hospitalRepository.delete(id);
  }
}
