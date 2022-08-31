import { Injectable } from '@nestjs/common';
import { CreateCoffeeDto } from 'src/coffees/dto/create-coffee.dto';
import { Coffee } from '../../entities/coffee.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateCoffeeDto } from 'src/coffees/dto/update-coffee.dto';
import { Flavor } from '../../entities/flavor.entity';

@Injectable()
export class CoffeeRepository {
  constructor(
    @InjectRepository(Coffee)
    private readonly model: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavors: Repository<Flavor>,
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
    const flavor = await this.flavors.findOne({
      where: {
        name,
      },
    });

    if (flavor) return flavor;

    const newFlavor = this.flavors.create({ name });

    return this.flavors.save(newFlavor);
  }
}
