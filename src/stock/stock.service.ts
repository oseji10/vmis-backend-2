import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stock } from './stock.entity';
import { Product } from 'src/product/product.entity';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private stockRepository: Repository<Stock>,
  ) {}

  findAll(): Promise<Stock[]> {
    return this.stockRepository.find({relations:['productId'],
        select:{
            productId:{
                shortName: true,
                productName: true,
                productDescription: true
            }
        }
    });
  }

  findOne(id: string): Promise<Stock> {
    return this.stockRepository.findOne({ where: { id }});
  }

  create(stock: Stock): Promise<Stock> {
    return this.stockRepository.save(stock);
  }

  async update(id: string, stock: Stock): Promise<Stock> {
    await this.stockRepository.update(id, stock);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.stockRepository.delete(id);
  }
}
