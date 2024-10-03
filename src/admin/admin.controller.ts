import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Admin } from './admin.entity';

@Controller('admins')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(id);
  }

  @Post()
  create(@Body() admin: Admin) {
    return this.adminService.create(admin);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() admin: Admin) {
    return this.adminService.update(id, admin);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(id);
  }
}
