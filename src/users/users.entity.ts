import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from 'typeorm';
import { Hospital } from '../hospital/hospital.entity';
import { Patient } from '../patient/patient.entity';
import { Admin } from '../admin/admin.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string; 

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ length: 11, nullable: true })
  phoneNumber: string;

  @Column({ nullable: true, enum: ['active', 'inactive'], default: 'active' })
  status: string;

  @OneToOne(() => Hospital, (hospital) => hospital.hospitalAdmin)
  hospitalAdmin: Hospital;

  @OneToOne(() => Patient, (patient) => patient.addedBy)
  addedBy: Patient;

  @OneToMany(() => Patient, (patient) => patient.user)
  patients: Patient[]; 
  
  @OneToMany(() => Admin, (admin) => admin.userId)
  admin: Admin; 
  
}
