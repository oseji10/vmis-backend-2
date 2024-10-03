import { Test, TestingModule } from '@nestjs/testing';
import { PricelistProductsController } from './pricelist_products.controller';

describe('PricelistProductsController', () => {
  let controller: PricelistProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PricelistProductsController],
    }).compile();

    controller = module.get<PricelistProductsController>(PricelistProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
