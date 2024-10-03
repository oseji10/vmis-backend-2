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
    return this.hospitalRepository.find({
      relations: ['hospitalAdmin', 'hospitalAdmin.userId'], // Include both relations
      select: {
        hospitalAdmin: {
          id: true,
          firstName: true,
          otherNames: true,
          userId: {
            id: true,
            email: true,
            phoneNumber: true,
          },
        },
      },
    });
  }
  

  findOne(id: string): Promise<Hospital> {
    return this.hospitalRepository.findOne({ where: { id }});
  }

  create(hospital: Hospital): Promise<Hospital> {
    return this.hospitalRepository.save(hospital);
  }

  async update(id: string, hospital: Hospital): Promise<Hospital> {
    await this.hospitalRepository.update(id, hospital);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.hospitalRepository.delete(id);
  }
}
