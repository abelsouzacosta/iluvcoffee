import { Injectable } from '@nestjs/common';
import { CoffeeRepository } from './domain/repositories/coffee.repository';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Injectable()
export class CoffeesService {
  constructor(private readonly repository: CoffeeRepository) {}

  async create(data: CreateCoffeeDto) {
    return this.repository.create(data);
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    const coffee = await this.repository.findById(id);

    return coffee;
  }

  async update(id: number, data: UpdateCoffeeDto) {
    return this.repository.update(id, data);
  }

  async remove(id: number) {
    return this.repository.remove(id);
  }
}