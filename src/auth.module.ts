// auth.module.ts
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserService } from './users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [UserService],
})
export class AuthModule {}
