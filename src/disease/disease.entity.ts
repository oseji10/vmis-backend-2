import { Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { Patient } from '../patient/patient.entity';

@Entity()
export class Disease {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    diseaseName: string;


    @OneToMany(() => Patient, (patient) => patient.diseaseType)
    diseaseType: Patient;

    @Column({nullable: true, enum: ['active', 'inactive'] })
    status: string;

    // Timestamp fields
    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;
   
    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;
   
    @DeleteDateColumn({ type: 'timestamptz', nullable: true })
    deletedAt?: Date;
}
