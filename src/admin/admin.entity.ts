import { Entity, JoinColumn, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../users/users.entity';

@Entity()
export class Admin {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstName: string;

    @Column()
    otherNames: string;

    @OneToOne(() => User, (user) => user.id)
    @JoinColumn()
    userId: User;

    

    // Timestamp fields
    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;
   
    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;
   
    @DeleteDateColumn({ type: 'timestamptz', nullable: true })
    deletedAt?: Date;
}
