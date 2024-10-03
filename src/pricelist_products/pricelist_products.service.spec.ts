import { Test, TestingModule } from '@nestjs/testing';
import { PricelistProductsService } from './pricelist_products.service';

describe('PricelistProductsService', () => {
  let service: PricelistProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PricelistProductsService],
    }).compile();

    service = module.get<PricelistProductsService>(PricelistProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
