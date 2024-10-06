import { User } from '../users/users.entity';
import { Manufacturer } from '../manufacturer/manufacturer.entity';
import { Supplier } from '../supplier/supplier.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, 
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { PricelistProducts } from '../pricelist_products/pricelist_products.entity';

@Entity()
export class Pricelist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  pricelistId: string;

  @Column()
  pricelistName: string;

  @ManyToOne(() => Supplier, (supplier) => supplier.id, { eager: true })
  @JoinColumn()
  supplierId: Supplier;

  @ManyToOne(() => Manufacturer, (manufacturer) => manufacturer.id, { eager: true })
  @JoinColumn()
  manufacturerId: Manufacturer;

  @Column({ default: 'inactive' })
  status: string;

  // Adjust the relationship to reference pricelistId in PricelistProducts
  // @OneToMany(() => PricelistProducts, (pricelist_products) => pricelist_products.pricelistId, { eager: true })
  // pricelist_products: PricelistProducts[];

  @OneToMany(() => PricelistProducts, (pricelist_products) => pricelist_products.pricelistId)
  pricelist_products: PricelistProducts[];
  


  // Timestamp fields
  @CreateDateColumn({ type: 'timestamptz' }) 
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  // Soft delete field
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deletedAt?: Date;
}
