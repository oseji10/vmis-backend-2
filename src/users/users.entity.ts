import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Hospital } from '../hospital/hospital.entity';
import { Patient } from '../patient/patient.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true })
    email: string;
  
    @Column({ nullable: true })
    password: string;

    @Column({ length: 11 })
    phoneNumber: string;

    @Column({nullable: true, enum: ['active', 'inactive'] })
    status: string;

    @OneToOne(() => Hospital, (hospital) => hospital.hospitalAdmin)
    hospitalAdmin: Hospital;

    @OneToOne(() => Patient, (patient) => patient.addedBy)
    addedBy: Patient;
}
