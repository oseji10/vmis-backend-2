import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { State } from './state.entity';

@Injectable()
export class StateService {
  constructor(
    @InjectRepository(State)
    private stateRepository: Repository<State>,
  ) {}

  findAll(): Promise<State[]> {
    return this.stateRepository.find();
  }

  findOne(id: string): Promise<State> {
    return this.stateRepository.findOne({ where: { id }});
  }

  create(state: State): Promise<State> {
    return this.stateRepository.save(state);
  }

  async update(id: string, state: State): Promise<State> {
    await this.stateRepository.update(id, state);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.stateRepository.delete(id);
  }
}
