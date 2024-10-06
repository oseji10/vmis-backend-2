import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductRequest } from './product_request.entity';
import { Supplier } from 'src/supplier/supplier.entity';
import { Manufacturer } from 'src/manufacturer/manufacturer.entity';

@Injectable()
export class ProductRequestService {
  constructor(
    @InjectRepository(ProductRequest)
    private productrequestRepository: Repository<ProductRequest>,
  ) {}



findAll(): Promise<ProductRequest[]> {
    return this.productrequestRepository.find({relations: ['hospital'],
        select:{
            hospital: {
                shortName: true,
                hospitalName: true
            }
        }
    });
}


  findOne(id: string): Promise<ProductRequest> {
    return this.productrequestRepository.findOne({ where: { id }});
  }


//   findRequestByRequestID(requestID: string): Promise<ProductRequest[]> {
//     return this.productrequestRepository.find({
//         where: { requestID },
//         relations: ['product', 'productRequestId', 'productRequestId.hospital', 'product.supplier'],
//         select: {
//           product: {
//             productName: true,
//             shortName: true,
//             productDescription: true,
//             supplier:{
//               shortName: true,
//               supplierName: true
//             }
//           },
//           productRequestId: {
//             id: true, // Include the ID or other properties as needed
//             hospital: {
//               shortName: true,
//               hospitalName: true,
//             },
//           },
//         },
//     });
// }



  create(productrequest: ProductRequest): Promise<ProductRequest> {
    return this.productrequestRepository.save(productrequest);
  }

  async update(id: string, productrequest: ProductRequest): Promise<ProductRequest> {
    await this.productrequestRepository.update(id, productrequest);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.productrequestRepository.delete(id);
  }
}
