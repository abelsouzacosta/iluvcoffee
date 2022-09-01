import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateCoffeeDto {
  @IsString({
    message: 'name should be a string',
  })
  @IsNotEmpty({
    message: 'name should not be empty',
  })
  name: string;

  @IsString({
    message: 'name should be a string',
  })
  @IsNotEmpty({
    message: 'brand should be provided',
  })
  brand: string;

  @IsString({
    each: true,
    message: 'flavors entity should be an string',
  })
  @IsArray({
    message: 'flavors should be an array',
  })
  @ArrayNotEmpty({
    message: 'flavors should be provided',
  })
  flavors: string[];
}
