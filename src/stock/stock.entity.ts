import { ProductRequest } from '../product_request/product_request.entity';
import { Product } from '../product/product.entity';
import { User } from '../users/users.entity';
import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { ProductRequestItems } from '../request/product_request_items.entity';
// import { State } from '../state/state.entity';
// import { State } from '../users/users.entity';

@Entity()
export class Stock {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false }) 
  stockId: string;

  @Column({ nullable: false, type: 'varchar' })
  requestID: string;


  @ManyToOne(() => ProductRequest, (productRequest) => productRequest.productRequestItems)
  @JoinColumn({ name: 'productRequestId' }) // Ensure this correctly references the foreign key
  productRequestId: ProductRequest;


  @ManyToOne(() => Product, (product) => product.id)
  @JoinColumn({ name: 'productId' }) // Ensure this correctly references the foreign key
  productId: Product;



  // @ManyToOne(() => ProductRequestItems, (productRequestItems) => productRequestItems.id)
  // @JoinColumn({ name: 'requestID' })
  // requestIDKey: ProductRequestItems;
 
  // @ManyToOne(() => ProductRequestItems, (productRequestItems) => productRequestItems.requestID)
  // @JoinColumn({ name: 'requestID', referencedColumnName: 'requestID' })
  // requestIDKey: ProductRequestItems;

  @Column()
  batchNumber: string;

  @Column({nullable: true})
  quantityReceived: number;

  @Column({nullable: true})
  quantitySold: number;

  @Column({nullable: true})
  quantityExpired: number;

  @Column({nullable: true})
  quantityRetrieved: number;

  @Column({nullable: true})
  quantityDamaged: number;

  @Column({ type: 'timestamptz', nullable: true })
  expiryDate: Date;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn()
  receivedBy: User;

  // Timestamp fields
  @CreateDateColumn({ type: 'timestamptz' }) // 'timestamptz' stores timezone info
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  // Soft delete field
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deletedAt?: Date;


  // @OneToMany(() => Product, (product) => product.stock)
  // products: Product[];

}
