import { Injectable } from '@nestjs/common';
import { CreateCoffeeDto } from 'src/coffees/dto/create-coffee.dto';
import { Coffee } from '../../entities/coffee.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateCoffeeDto } from 'src/coffees/dto/update-coffee.dto';
import { Flavor } from '../../entities/flavor.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Event } from '../../../events/entities/event.entity';

@Injectable()
export class CoffeeRepository {
  constructor(
    @InjectRepository(Coffee)
    private readonly model: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavors: Repository<Flavor>,
    private readonly dataSource: DataSource,
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

  async find({ offset, limit }: PaginationQueryDto): Promise<Array<Coffee>> {
    return this.model.find({
      relations: {
        flavors: true,
      },
      take: limit,
      skip: offset,
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

  async recommendCoffee(coffee: Coffee) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      coffee.recommendations += 1;

      const recommendEvent = new Event();
      recommendEvent.name = 'recommend_coffee';
      recommendEvent.type = 'coffee';
      recommendEvent.payload = { coffeid: coffee.id };

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
