import { Manufacturer } from '../manufacturer/manufacturer.entity';
import { Supplier } from '../supplier/supplier.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, 
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  shortName: string;

  @Column()
  productName: string;

  @Column()
  productDescription: string;

  @Column()
  formulation: string;

  // Many products can belong to one supplier
  @ManyToOne(() => Supplier, (supplier) => supplier.id)
  // @ManyToOne(() => Supplier, (supplier) => supplier.id, { eager: true })
  supplier: Supplier;

  // Many products can belong to one manufacturer
  @ManyToOne(() => Manufacturer, (manufacturer) => manufacturer.id)
  manufacturer: Manufacturer;

  // Timestamp fields
  @CreateDateColumn({ type: 'timestamptz' }) 
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  // Soft delete field
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deletedAt?: Date;
}
