import { Pricelist } from '../pricelist/pricelist.entity';
import { Manufacturer } from '../manufacturer/manufacturer.entity';
import { Supplier } from '../supplier/supplier.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, 
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
} from 'typeorm';
import { Product } from '../product/product.entity';
import { User } from '../users/users.entity';

@Entity()
export class PricelistProducts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @ManyToOne(() => Pricelist, (pricelist) => pricelist.id)
  // @JoinColumn()
  // pricelistId: Pricelist;

  @ManyToOne(() => Pricelist, (pricelist) => pricelist.pricelist_products)
  @JoinColumn({ name: 'pricelistId' })
  pricelistId: Pricelist;
  

  

  @ManyToOne(() => Product, (product) => product.id)
  @JoinColumn()
  productId: Product;

  @Column({nullable: true, type: 'decimal'})
  landedCost: number;

  @Column({nullable: true, type: 'decimal'})
  hospitalMarkup: number;

  @Column({nullable: true, type: 'decimal'})
  supplierMarkup: number;

  @Column({nullable: true, type: 'decimal'})
  consultantMarkup: number;

  @Column({nullable: true, type: 'decimal'})
  bankCharges: number;

  @Column({nullable: true, type: 'decimal'})
  otherCharges: number;

  @Column({nullable: true})
  discountCode: string;

  @ManyToOne(() => User, (user) => user.id, { eager: true, nullable:true })
  @JoinColumn()
  uploadedBy: User;
  
@Column({nullable: true, enum:['active', 'inactive'], default: 'active'})
status: string;

  // Timestamp fields
  @CreateDateColumn({ type: 'timestamptz' }) 
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  // Soft delete field
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deletedAt?: Date;
}
