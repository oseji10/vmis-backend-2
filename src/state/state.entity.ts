import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, 
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne, } from 'typeorm';
// import { State } from '../state/state.entity';
// import { State } from '../users/users.entity';

@Entity()
export class State {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ length: 100 })
    stateName: string;
  
   
     // Timestamp fields
  @CreateDateColumn({ type: 'timestamptz' }) // 'timestamptz' stores timezone info
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  // Soft delete field
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deletedAt?: Date;

}
