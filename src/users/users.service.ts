import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import * as bcrypt from 'bcrypt';  // Import bcrypt

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Find all users
  findAll(): Promise<User[]> {
    return this.userRepository.find(
      {
        relations: ['admin'], 
        select: {
          email: true,
          phoneNumber: true,
          status: true,
            admin: {
                firstName: true,
                otherNames: true,
            },
        },
    });
  }

  // Find one user by email
  async findOne(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });  // Use findOne with correct query object
  }

  // Create a new user
  async create(email: string, password: string, phoneNumber: string, status: string): Promise<User> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = this.userRepository.create({
      email,
      password: hashedPassword,
      phoneNumber,
      status: 'active'
    });

    return this.userRepository.save(newUser);  // Save the new user to the database
  }

  // Update an existing user
  async update(email: string, user: Partial<User>): Promise<User> {
    await this.userRepository.update({ email }, user);
    return this.findOne(email);  // Return the updated user
  }

  // Remove a user by ID
  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }


   // Validate the user's password
   async validatePassword(email: string, plainPassword: string): Promise<boolean> {
    const user = await this.findOne(email);
    if (!user) {
      return false;  // User not found
    }

    // Compare the provided plain password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(plainPassword, user.password);
    return isPasswordValid;
  }
}
