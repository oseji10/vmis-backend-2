import { Test, TestingModule } from '@nestjs/testing';
import { ProductRequestItemsService } from './product_request_items.service';

describe('ProductRequestItemsService', () => {
  let service: ProductRequestItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductRequestItemsService],
    }).compile();

    service = module.get<ProductRequestItemsService>(ProductRequestItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
