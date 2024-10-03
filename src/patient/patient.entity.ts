import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Hospital } from '../hospital/hospital.entity';
import { User } from './../users/users.entity';
import { State } from '../state/state.entity';
import { Disease } from '../disease/disease.entity';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string; // Changed to string because it's a UUID

  @OneToOne(() => User)
  @JoinColumn()
  user: User; // Changed from userId to user to reflect the relationship

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  otherNames: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ type: 'date', nullable: true })
  dateOfBirth: Date;

  @ManyToOne(() => State, (state) => state.id, { nullable: true })
  @JoinColumn()
  stateOfOrigin: State;

  @ManyToOne(() => State, (state) => state.id, { nullable: true })
  @JoinColumn()
  stateOfResidence: State;

  @ManyToOne(() => Disease, (disease) => disease.id, { nullable: true })
  @JoinColumn()
  diseaseType: Disease;

  @Column({ nullable: true })
  maritalStatus: string;

  @Column({ nullable: true })
  hospitalFileNumber: string;

  @Column({ nullable: true })
  status: string;

  // Timestamp fields
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  // Soft delete field
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deletedAt?: Date;

  @ManyToOne(() => Hospital, (hospital) => hospital.id)
  @JoinColumn()
  hospital: Hospital;

  @OneToOne(() => User)
  @JoinColumn()
  addedBy: User; // Simplified relationship, no need for extra relationship complexity
}
