import { Injectable } from '@nestjs/common';
import { CreateCoffeeDto } from 'src/coffees/dto/create-coffee.dto';
import { Coffee } from '../../entities/coffee.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateCoffeeDto } from 'src/coffees/dto/update-coffee.dto';

@Injectable()
export class CoffeeRepository {
  constructor(
    @InjectRepository(Coffee)
    private readonly model: Repository<Coffee>,
  ) {}

  async create(data: CreateCoffeeDto): Promise<Coffee> {
    const coffee = this.model.create(data);

    return this.model.save(coffee);
  }

  async find(): Promise<Array<Coffee>> {
    return this.model.find({
      relations: {
        flavors: true,
      },
    });
  }

  async findById(id: number): Promise<Coffee> {
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
