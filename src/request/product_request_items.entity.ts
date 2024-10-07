import { Pricelist } from '../pricelist/pricelist.entity';
import { Manufacturer } from '../manufacturer/manufacturer.entity';
import { Supplier } from '../supplier/supplier.entity';
import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
} from 'typeorm';
import { Product } from '../product/product.entity';
import { User } from '../users/users.entity';
import { Hospital } from '../hospital/hospital.entity';
import { ProductRequest } from '../product_request/product_request.entity';

@Entity()
export class ProductRequestItems {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  

  @Column({ nullable: false, type:'varchar' })
  requestID: string;

  // @ManyToOne(() => ProductRequest, (productRequest) => productRequest.requestID)
  // @JoinColumn({ name: 'requestID' })
  // productRequestId: ProductRequest;

  @ManyToOne(() => ProductRequest, (productRequest) => productRequest.productRequestItems)
  @JoinColumn({ name: 'productRequestId' }) // Ensure this correctly references the foreign key
  productRequestId: ProductRequest; 


  @ManyToOne(() => Product, (product) => product.id)
  @JoinColumn()
  product: Product;

  // Request
  @Column({ nullable: true })
  quantityRequested: number;

  @ManyToOne(() => User, (user) => user.id, { nullable: true })
  @JoinColumn()
  requestedBy: User;

  @Column({ type: 'timestamptz', nullable: true })
  requestedDate: Date;

  // Dispatch
  @Column({ nullable: true })
  quantityDispatched: number;

  @ManyToOne(() => User, (user) => user.id, { eager: true, nullable: true })
  @JoinColumn()
  dispatchedBy: User;

  @Column({ type: 'timestamptz', nullable: true })
  dispatchedDate: Date;

  // Receipt
  @Column({ nullable: true })
  quantityReceived: number;


  @ManyToOne(() => User, (user) => user.id, { eager: true, nullable: true })
  @JoinColumn()
  receivedBy: User;

  @Column({ type: 'timestamptz', nullable: true })
  receivedDate: Date;

  @Column({ nullable: true })
  batchNumber: string;

  @Column({ type: 'timestamptz', nullable: true })
  expiryDate: Date;

  @Column({ nullable: true, enum: ['requested', 'dispatched', 'received', 'cancelled'], default: 'requested' })
  status: string;

  // Timestamp fields

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  // Soft delete field
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deletedAt?: Date;
}
