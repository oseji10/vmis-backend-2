import { Entity, PrimaryGeneratedColumn, JoinColumn, Column, OneToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { User } from '../users/users.entity';
import { Admin } from './../admin/admin.entity';

@Entity()
export class Hospital {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: true })
    shortName: string;

    @Column()
    hospitalName: string;


    @Column({nullable: true })
    location: string;
    
  
    @OneToOne(() => Admin, (admin) => admin.id)
    @JoinColumn()
    hospitalAdmin: Admin;

    @Column({nullable: true, enum: ['active', 'inactive'], default: 'active' })
    status: string;

    // Timestamp fields
    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;
   
    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;
   
    @DeleteDateColumn({ type: 'timestamptz', nullable: true })
    deletedAt?: Date;
}
