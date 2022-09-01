import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Coffee } from '../../entities/coffee.entity';
import { Flavor } from '../../entities/flavors.entity';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from '../dto/create-coffee.dto';
import { UpdateCoffeeDto } from '../dto/update-coffee.dto';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';

@Injectable()
export class CoffeeRepository {
  constructor(
    @InjectRepository(Coffee)
    private readonly model: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorModel: Repository<Flavor>,
  ) {}

  async create(data: CreateCoffeeDto): Promise<Coffee> {
    const flavors = await Promise.all(
      data.flavors.map((name) => this.preloadFlavorByName(name)),
    );

    const coffee = this.model.create({
      ...data,
      flavors,
    });

    return this.model.save(coffee);
  }

  find({ limit, offset }: PaginationQueryDto): Promise<Array<Coffee>> {
    return this.model.find({
      relations: ['flavors'],
      take: limit,
      skip: offset,
    });
  }

  findById(id: number): Promise<Coffee> {
    return this.model.findOne({
      where: {
        id,
      },
      relations: ['flavors'],
    });
  }

  async update(id: number, data: UpdateCoffeeDto): Promise<Coffee> {
    const flavors = data.flavors
      ? await Promise.all(
          data.flavors.map((name) => this.preloadFlavorByName(name)),
        )
      : null;

    const coffee = await this.model.preload({
      id,
      ...data,
      flavors,
    });

    return this.model.save(coffee);
  }

  async remove(id: number): Promise<Coffee> {
    const coffee = await this.findById(id);

    return this.model.remove(coffee);
  }

  async preloadFlavorByName(name: string): Promise<Flavor> {
    const flavor = await this.flavorModel.findOne({
      where: {
        name,
      },
    });

    if (flavor) return flavor;

    const newFlavor = this.flavorModel.create({ name });

    return this.flavorModel.save(newFlavor);
  }
}
