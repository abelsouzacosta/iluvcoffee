import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly repository: Repository<Coffee>,
  ) {}

  async create(data: CreateCoffeeDto) {
    const coffee = this.repository.create(data);

    return this.repository.save(coffee);
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    const coffee = await this.repository.findOne({ where: { id } });

    return coffee;
  }

  async update(id: number, data: UpdateCoffeeDto) {
    const coffee = await this.repository.preload({
      id,
      ...data,
    });

    return this.repository.save(coffee);
  }

  async remove(id: number) {
    const coffee = await this.findOne(id);

    return this.repository.remove(coffee);
  }
}
