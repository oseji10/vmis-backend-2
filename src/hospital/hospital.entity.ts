import { Entity, PrimaryGeneratedColumn, JoinColumn, Column, OneToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { User } from '../users/users.entity';

@Entity()
export class Hospital {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    hospitalName: string;

    @Column({nullable: true })
    location: string;
    
  
    @OneToOne(() => User, (user) => user.hospitalAdmin)
    @JoinColumn()
    hospitalAdmin: User;

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
