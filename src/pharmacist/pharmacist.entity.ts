import { Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToMany, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from '../users/users.entity';
import { Hospital } from '../hospital/hospital.entity';

@Entity()
export class Pharmacist {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstName: string;

    @Column()
    otherNames: string;

    @Column({nullable: true})
    gender: string;


    @OneToOne(() => User, (user) => user.id)
    @JoinColumn()
    userId: User;


    @OneToOne(() => Hospital, (hospital) => hospital.id)
    @JoinColumn()
    hospitalId: Hospital;


    @Column({nullable: true})
    roleId: string;

    // @Column({nullable: true, enum: ['active', 'inactive'],  })
    // status: string;

    // Timestamp fields
    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;
   
    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;
   
    @DeleteDateColumn({ type: 'timestamptz', nullable: true })
    deletedAt?: Date;
}
