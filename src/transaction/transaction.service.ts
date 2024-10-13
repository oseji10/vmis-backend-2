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

  async markAsPaid(id: string): Promise<Transaction> {
    // Update the status of the transaction to 'paid'
    const result = await this.transactionRepository.update(
      { id: id },  // Use the transactionId to find the record
      { status: 'paid' }      // Update the status field
    );
  
    // Check if the update affected any rows
    if (result.affected === 0) {
      throw new Error(`Transaction with ID ${id} not found or already paid`);
    }
  
    // Retrieve and return the updated transaction
    return this.findOne(id);
  }
  

  async remove(id: string): Promise<void> {
    await this.transactionRepository.delete(id);
  }
}
