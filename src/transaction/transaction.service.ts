import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  findAll(): Promise<Transaction[]> {
    return this.transactionRepository.find({relations:['hospital']});
  }

  findOne(id: string): Promise<Transaction> {
    return this.transactionRepository.findOne({ where: { id }});
  }

  create(transaction: Transaction): Promise<Transaction> {
    return this.transactionRepository.save(transaction);
  }

  async update(id: string, transaction: Transaction): Promise<Transaction> {
    await this.transactionRepository.update(id, transaction);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.transactionRepository.delete(id);
  }
}
