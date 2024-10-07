import { Transaction } from '../transaction/transaction.entity';
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
import { Hospital } from 'src/hospital/hospital.entity';
// import { State } from '../state/state.entity';
// import { State } from '../users/users.entity';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({nullable: true})
    saleId: string;

    @Column({nullable: true})
    quantitySold: number;

    @ManyToOne(() => Transaction, (transaction) => transaction.id)
   @JoinColumn()
    transaction: Transaction;

    @ManyToOne(() => Hospital, (hospital) => hospital.id)
   @JoinColumn()
    hospital: Hospital;

    @ManyToOne(() => Product, (product) => product.id)
    @JoinColumn()
     product: Product;

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


     // Timestamp fields
  @CreateDateColumn({ type: 'timestamptz' }) // 'timestamptz' stores timezone info
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  // Soft delete field
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deletedAt?: Date;




  @Column({ nullable: true, enum: ['paid', 'pending'], default: 'pending' })
  status: string;

}
