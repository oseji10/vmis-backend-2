import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Manufacturer } from './manufacturer.entity';

@Injectable()
export class ManufacturerService {
  constructor(
    @InjectRepository(Manufacturer)
    private manufacturerRepository: Repository<Manufacturer>,
  ) {}

  findAll(): Promise<Manufacturer[]> {
    return this.manufacturerRepository.find();
  }

  findOne(id: string): Promise<Manufacturer> {
    return this.manufacturerRepository.findOne({ where: { id }});
  }

  create(manufacturer: Manufacturer): Promise<Manufacturer> {
    return this.manufacturerRepository.save(manufacturer);
  }

  async update(id: string, manufacturer: Manufacturer): Promise<Manufacturer> {
    await this.manufacturerRepository.update(id, manufacturer);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.manufacturerRepository.delete(id);
  }
}
