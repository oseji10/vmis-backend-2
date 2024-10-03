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

  @ManyToOne(() => Pricelist, (pricelist) => pricelist.id, { eager: true })
  @JoinColumn()
  pricelistId: Pricelist;

  @ManyToOne(() => Product, (product) => product.id, { eager: true })
  @JoinColumn()
  productId: Product;

  @Column({nullable: true})
  landedCost: number;

  @Column({nullable: true})
  hospitalMarkup: number;

  @Column({nullable: true})
  supplierMarkup: number;

  @Column({nullable: true})
  consultantMarkup: number;

  @Column({nullable: true})
  bankCharges: number;

  @Column({nullable: true})
  otherCharges: number;

  @Column({nullable: true})
  discountCode: string;

  @ManyToOne(() => User, (user) => user.id, { eager: true, nullable:true })
  @JoinColumn()
  uploadedBy: User;
  

  // Timestamp fields
  @CreateDateColumn({ type: 'timestamptz' }) 
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  // Soft delete field
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deletedAt?: Date;
}
