import { Test, TestingModule } from '@nestjs/testing';
import { ProductRequestController } from './product_request.controller';

describe('ProductRequestController', () => {
  let controller: ProductRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductRequestController],
    }).compile();

    controller = module.get<ProductRequestController>(ProductRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
