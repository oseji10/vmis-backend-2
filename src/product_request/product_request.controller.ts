import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { ProductRequestService } from './product_request.service';
import { ProductRequest } from './product_request.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('requests')
export class ProductRequestController {
  constructor(private readonly productrequestService: ProductRequestService) {}
  @UseGuards(AuthGuard('session'))
  
  @Get()
  findAll() {
    return this.productrequestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productrequestService.findOne(id);
  }

  @Post()
  create(@Body() productrequest: ProductRequest) {
    return this.productrequestService.create(productrequest);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() productrequest: ProductRequest) {
    return this.productrequestService.update(id, productrequest);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productrequestService.remove(id);
  }


//   @Get('one-request/:requestID')
//   async findRequestByRequestID(@Param('requestID') requestID: string): Promise<ProductRequest[]> {
//     return this.productrequestService.findRequestByRequestID(requestID);
//   }

}
