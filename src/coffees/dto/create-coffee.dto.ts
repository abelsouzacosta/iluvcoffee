import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCoffeeDto {
  @IsString({
    message: 'name shoudl be a string',
  })
  @IsNotEmpty({
    message: 'name should be provided',
  })
  name: string;

  @IsString({
    message: 'brand should be a string',
  })
  @IsNotEmpty({
    message: 'brand should be provided',
  })
  brand: string;

  @IsString({
    each: true,
    message: 'flavors should be a string',
  })
  @IsArray({
    message: 'falvors should be an array',
  })
  @IsOptional()
  flavors?: string[];
}
