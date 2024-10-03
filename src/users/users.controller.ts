import { Controller, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './users.service';
@Controller('users')
export class UserController {

constructor(private readonly userService: UserService) {}
@UseGuards(AuthGuard('session'))

@Get()
findAll() {
  return this.userService.findAll();
}
}