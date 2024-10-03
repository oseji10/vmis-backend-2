import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Disease } from './disease.entity';

@Injectable()
export class DiseaseService {
  constructor(
    @InjectRepository(Disease)
    private diseaseRepository: Repository<Disease>,
  ) {}

  findAll(): Promise<Disease[]> {
    return this.diseaseRepository.find();
  }

  findOne(id: string): Promise<Disease> {
    return this.diseaseRepository.findOne({ where: { id }});
  }

  create(disease: Disease): Promise<Disease> {
    return this.diseaseRepository.save(disease);
  }

  async update(id: string, disease: Disease): Promise<Disease> {
    await this.diseaseRepository.update(id, disease);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.diseaseRepository.delete(id);
  }
}
