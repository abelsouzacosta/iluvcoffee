import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiKeyGuard } from '../common/guards/api-key.guard';
import { Public } from '../common/decorators/public.decorator';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './domain/dto/create-coffee.dto';
import { UpdateCoffeeDto } from './domain/dto/update-coffee.dto';
import { WrapResponseInterceptor } from '../common/interceptors/wrap-response.interceptor';

@UseGuards(ApiKeyGuard)
@UseInterceptors(WrapResponseInterceptor)
@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() data: CreateCoffeeDto) {
    return this.coffeesService.create(data);
  }

  @Public()
  @Get()
  findAll(@Query(new ValidationPipe()) query: PaginationQueryDto) {
    return this.coffeesService.findAll(query);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coffeesService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body() data: UpdateCoffeeDto) {
    return this.coffeesService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeesService.remove(+id);
  }
}
