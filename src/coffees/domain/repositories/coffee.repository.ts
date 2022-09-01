import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Coffee } from '../../entities/coffee.entity';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from '../dto/create-coffee.dto';
import { UpdateCoffeeDto } from '../dto/update-coffee.dto';

@Injectable()
export class CoffeeRepository {
  constructor(
    @InjectRepository(Coffee)
    private readonly model: Repository<Coffee>,
  ) {}

  create(data: CreateCoffeeDto): Promise<Coffee> {
    const coffee = this.model.create(data);

    return this.model.save(coffee);
  }

  find(): Promise<Array<Coffee>> {
    return this.model.find();
  }

  findById(id: number): Promise<Coffee> {
    return this.model.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, data: UpdateCoffeeDto): Promise<Coffee> {
    const coffee = await this.model.preload({
      id,
      ...data,
    });

    return this.model.save(coffee);
  }

  async remove(id: number): Promise<Coffee> {
    const coffee = await this.findById(id);

    return this.model.remove(coffee);
  }
}
