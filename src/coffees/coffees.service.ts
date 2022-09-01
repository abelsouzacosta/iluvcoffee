import { Injectable } from '@nestjs/common';
import { CreateCoffeeDto } from './domain/dto/create-coffee.dto';
import { UpdateCoffeeDto } from './domain/dto/update-coffee.dto';
import { CoffeeRepository } from './domain/repositories/coffee.repository';

@Injectable()
export class CoffeesService {
  constructor(private readonly repository: CoffeeRepository) {}

  create(data: CreateCoffeeDto) {
    return this.repository.create(data);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findById(id);
  }

  update(id: number, data: UpdateCoffeeDto) {
    return this.repository.update(id, data);
  }

  remove(id: number) {
    return this.repository.remove(id);
  }
}
