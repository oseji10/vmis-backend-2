// import { Controller, Post, Body } from '@nestjs/common';
// import { ProductRequest } from '../product_request/product_request.entity';
// import { ProductRequestItems } from './product_request_items.entity';
// import { ProductRequestService } from '../product_request/product_request.service';
// import { ProductRequestItemsService } from './product_request_items.service';


// @Controller('drug-request')
// export class ProductRequestItemsController {
//     constructor(private readonly requestService: ProductRequestItemsService) {}

//     @Post('new_request')
//   async createProductRequestWithItems(
//     @Body('productRequest') productRequestData: ProductRequest,
//     @Body('productRequestItems') productRequestItemsData: ProductRequestItems[],
//   ) {
//     return this.requestService.createProductRequestWithItems(productRequestData, productRequestItemsData);
//   }
// }





import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { ProductRequestItemsService } from './product_request_items.service';
import { ProductRequest } from '../product_request/product_request.entity';
import { ProductRequestItems } from './product_request_items.entity';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller('drug-request')
export class ProductRequestItemsController {
  constructor(private readonly requestService: ProductRequestItemsService,
    private readonly productService: ProductRequestItemsService,
    @InjectRepository(ProductRequest) private readonly entityRepo: Repository<ProductRequest>,
  ) {}
//   constructor(private readonly requestService: ProductRequestItemsService) {}
  @UseGuards(AuthGuard('session'))
  
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':requestID')
findMany(@Param('productRequestId') requestID: string) {
  return this.productService.findMany(requestID); // Change to findMany
}

//   @Get(':productRequestId')
//   findOne(@Param('productRequestId') productRequestId: string) {
//     return this.productService.findOne(productRequestId);
//   }

//   @Post()
//   create(@Body() product: ProductRequestItems) {
//     return this.productService.create(product);
//   }


  

// Create a new procurement request
  @Post('new-request')
  async createProductRequestWithItems(
    @Body('productRequest') productRequestData: ProductRequest,
    @Body('productRequestItems') productRequestItemsData: ProductRequestItems[],
  ) {
    return this.requestService.createProductRequestWithItems(productRequestData, productRequestItemsData);
  }

  // Dispatch products
  @Put('dispatch/:requestID')
  update(@Param('requestID') requestID: string, @Body() product: ProductRequestItems) {
    return this.productService.dispatchProducts(requestID, product);
  }



// Receive products to Stock
  @Put('receive/:requestID')
  async receiveProductToStock(
      @Param('requestID') requestID: string, 
      @Body() product: ProductRequestItems
  ) {
      // Call the service method to receive product and update stock
      return await this.productService.receiveProductToStock(requestID, product);
  }

//   Pull one request item 
  @Get('one-request/:requestID')
  async findRequestByRequestID(@Param('requestID') requestID: string): Promise<ProductRequestItems[]> {
    return this.productService.findRequestByRequestID(requestID);
  }



  //   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.productService.remove(id);
//   }
}
