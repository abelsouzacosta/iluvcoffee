import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CoffeesService } from './coffees.service';
import { CoffeeRepository } from './domain/repositories/coffee.repository';
import { Flavor } from './entities/flavors.entity';

describe('CoffeesService', () => {
  let service: CoffeesService;
  const mockedCoffeesObjects = [
    {
      id: 1,
      name: 'California Dark Brew',
      brand: 'Mega Coffee',
      flavors: [],
    },
  ];

  const mockedCoffeeRepository = {
    findById: jest.fn((id) =>
      Promise.resolve(mockedCoffeesObjects.find((mock) => mock.id === id)),
    ),

    find: jest.fn(() => Promise.resolve(mockedCoffeesObjects)),

    create: jest.fn((value) => Promise.resolve({ id: 3, ...value })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoffeesService,
        {
          provide: DataSource,
          useValue: {},
        },
        {
          provide: CoffeeRepository,
          useValue: mockedCoffeeRepository,
        },
        {
          provide: getRepositoryToken(Flavor),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<CoffeesService>(CoffeesService);
  });

  it('CoffeesService should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all coffees in the database', async () => {
      const coffees = await service.findAll();
      const findSpy = jest.spyOn(mockedCoffeeRepository, 'find');

      expect(findSpy).toHaveBeenCalledTimes(1);
      expect(coffees).toEqual(mockedCoffeesObjects);
    });
  });

  describe('findOne', () => {
    describe('Success Cases', () => {
      it('should return a a coffee when id exists', async () => {
        const id = 1;

        const coffee = await service.findOne(id);
        const findByIdSpy = jest.spyOn(mockedCoffeeRepository, 'findById');

        expect(findByIdSpy).toHaveBeenCalledTimes(1);
        expect(coffee).toEqual(mockedCoffeesObjects[0]);
      });
    });

    describe('Fail Cases', () => {
      it('should return an empty array if the id passed to the function does not exists', async () => {
        const id = 2;

        const coffee = await service.findOne(id);
        const findByIdSpy = jest.spyOn(mockedCoffeeRepository, 'findById');

        expect(findByIdSpy).toHaveBeenCalledTimes(2);
        expect(coffee).toBeUndefined();
      });
    });
  });

  describe('Create', () => {
    describe('Success Case', () => {
      it('should create an instance of coffee in the database', async () => {
        const createdCoffee = await service.create({
          name: 'New Coffee',
          brand: 'New Coffee',
          flavors: [],
        });

        const mockedCreatedCoffee = {
          id: 3,
          ...createdCoffee,
        };

        const createSpy = jest.spyOn(mockedCoffeeRepository, 'create');

        expect(createSpy).toHaveBeenCalledTimes(1);
        expect(createdCoffee).toEqual(mockedCreatedCoffee);
      });
    });
  });
});
