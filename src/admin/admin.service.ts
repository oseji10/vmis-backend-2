import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  findAll(): Promise<Admin[]> {
    return this.adminRepository.find({relations: ['userId'],
      select: {
        id: true,
        firstName: true,
        otherNames: true,
        
          userId: {
              email: true,
              phoneNumber: true,
          },
      },
    }
    );
  }

  findOne(id: string): Promise<Admin> {
    return this.adminRepository.findOne({ where: { id } });
  }

  create(admin: Admin): Promise<Admin> {
    return this.adminRepository.save(admin);
  }

  async update(id: string, admin: Admin): Promise<Admin> {
    await this.adminRepository.update(id, admin);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.adminRepository.delete(id);
  }
}
