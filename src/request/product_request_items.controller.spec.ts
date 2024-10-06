import { Test, TestingModule } from '@nestjs/testing';
import { ProductRequestItemsController } from './product_request_items.controller';

describe('ProductRequestItemsController', () => {
  let controller: ProductRequestItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductRequestItemsController],
    }).compile();

    controller = module.get<ProductRequestItemsController>(ProductRequestItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
