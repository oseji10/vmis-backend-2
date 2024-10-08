import { Pricelist } from '../pricelist/pricelist.entity';
import { Manufacturer } from '../manufacturer/manufacturer.entity';
import { Supplier } from '../supplier/supplier.entity';
import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Product } from '../product/product.entity';
import { User } from '../users/users.entity';
import { Hospital } from '../hospital/hospital.entity';
import { ProductRequestItems } from '../request/product_request_items.entity';

@Entity()
export class ProductRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @OneToMany(() => ProductRequestItems, (product_request_items) => product_request_items.productRequestId)
  @Column({nullable: false, type: 'varchar'})
  requestID: string;



  @OneToMany(() => ProductRequestItems, (productRequestItems) => productRequestItems.productRequestId)
  productRequestItems: ProductRequestItems[];


  @ManyToOne(() => Hospital, (hospital) => hospital.id)
  @JoinColumn()
  hospital: Hospital;


  @Column({ nullable: true, enum: ['fulfilled', 'pending fulfilment'], default: 'pending fulfilment' })
  status: string;

  // Timestamp fields

  @CreateDateColumn({ type: 'timestamptz' }) // 'timestamptz' stores timezone info
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  // Soft delete field
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deletedAt?: Date;
}
