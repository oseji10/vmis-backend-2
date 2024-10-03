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

  @Column({default: 'inactive'})
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
