import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, 
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn
 } from 'typeorm';
import { Hospital } from '../hospital/hospital.entity';
import { User } from './../users/users.entity';
import { State } from '../state/state.entity';
import { Disease } from '../disease/disease.entity';

@Entity()
export class Patient {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ length: 100 })
    firstName: string;
  
    @Column({ length: 100 })
    lastName: string;
  
    @Column({nullable: true })
    gender: string;
  
    @Column({nullable: true })
    dateOfBirth: Date;
  
    @ManyToOne(() => State, (state) => state.id, { nullable: true })
    @JoinColumn()
    stateOfOrigin: State;

    @ManyToOne(() => State, (state) => state.id, { nullable: true })
    @JoinColumn()
    stateOfResidence: State;

    @ManyToOne(() => Disease, (disease) => disease.id)
    @JoinColumn()
    diseaseType: Disease;

     
    @Column({nullable: true })
    maritalStatus: string;
  
    
    @Column({nullable: true })
    hospitalFileNumber: string;
  
    @Column({nullable: true })
    status: string;

    // Timestamp fields
  @CreateDateColumn({ type: 'timestamptz' }) // 'timestamptz' stores timezone info
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  // Soft delete field
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deletedAt?: Date;
  
  @ManyToOne(() => Hospital, (hospital) => hospital.id)
  @JoinColumn()
  hospital: Hospital;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn()
  addedBy: User;
}
