import { Hospital } from '../hospital/hospital.entity';
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
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    transactionId: string;

    @Column({nullable: true})
    paymentMode: string;

    @OneToOne(() => Admin, (admin) => admin.id)
    @JoinColumn()
    soldBy: Admin;

    @Column({ type: 'timestamptz', nullable: true })
  paymentDate: Date;

  @Column({ nullable: true})
  amount: number;

  @ManyToOne(() => Hospital, (hospital) => hospital.id)
  @JoinColumn()
   hospital: Hospital;

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
