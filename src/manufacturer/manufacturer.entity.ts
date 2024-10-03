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
export class Manufacturer {
  @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    shortName: string;

    @Column()
    manufacturerName: string;
  
    @OneToOne(() => User, (user) => user.id)
    @JoinColumn()
    contactPerson: User;

     // Timestamp fields
  @CreateDateColumn({ type: 'timestamptz' }) // 'timestamptz' stores timezone info
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  // Soft delete field
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deletedAt?: Date;

  @OneToMany(() => Product, (product) => product.manufacturer)
  products: Product[];

}
