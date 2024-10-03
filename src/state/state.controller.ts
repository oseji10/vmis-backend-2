import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { StateService } from './state.service';
import { State } from './state.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('states')
export class StateController {
  constructor(private readonly stateService: StateService) {}
  @UseGuards(AuthGuard('session'))
  
  @Get()
  findAll() {
    return this.stateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stateService.findOne(id);
  }

  @Post()
  create(@Body() state: State) {
    return this.stateService.create(state);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() state: State) {
    return this.stateService.update(id, state);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stateService.remove(id);
  }
}
