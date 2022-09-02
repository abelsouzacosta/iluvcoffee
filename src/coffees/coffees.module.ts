import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CoffeesController } from './coffees.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { CoffeeRepository } from './domain/repositories/coffee.repository';
import { Flavor } from './entities/flavors.entity';
import { LoggingMiddleware } from '../common/middlewares/logging.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor])],
  controllers: [CoffeesController],
  providers: [CoffeesService, CoffeeRepository],
})
export class CoffeesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('coffees');
  }
}
