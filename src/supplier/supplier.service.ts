import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supplier } from './supplier.entity';

@Injectable()
export class SupplierService {
  constructor(
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
  ) {}

  findAll(): Promise<Supplier[]> {
    return this.supplierRepository.find();
  }

  findOne(id: string): Promise<Supplier> {
    return this.supplierRepository.findOne({ where: { id }});
  }

  create(supplier: Supplier): Promise<Supplier> {
    return this.supplierRepository.save(supplier);
  }

  async update(id: string, supplier: Supplier): Promise<Supplier> {
    await this.supplierRepository.update(id, supplier);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.supplierRepository.delete(id);
  }
}
