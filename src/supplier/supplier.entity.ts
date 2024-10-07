import { Admin } from '../admin/admin.entity';
import { Product } from '../product/product.entity';
import { User } from '../users/users.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, 
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany, } from 'typeorm';
// import { State } from '../state/state.entity';
// import { State } from '../users/users.entity';

@Entity()
export class Supplier {
  @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    shortName: string;

    @Column()
    supplierName: string;
  
    // @OneToOne(() => User, (user) => user.id)
    // @JoinColumn()
    // contactPerson: User;

    @OneToOne(() => Admin, (admin) => admin.id)
    @JoinColumn()
    contactPerson: Admin;


     // Timestamp fields
  @CreateDateColumn({ type: 'timestamptz' }) // 'timestamptz' stores timezone info
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  // Soft delete field
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deletedAt?: Date;


  @OneToMany(() => Product, (product) => product.supplier)
  products: Product[];


  @Column({ nullable: true, enum: ['active', 'inactive'], default: 'active' })
  status: string;

}
