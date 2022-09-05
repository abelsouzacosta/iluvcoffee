import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateCoffeeDto {
  @ApiProperty({ description: 'The name of the coffee' })
  @IsString({
    message: 'name should be a string',
  })
  @IsNotEmpty({
    message: 'name should not be empty',
  })
  name: string;

  @ApiProperty({ description: 'The brand of the coffee' })
  @IsString({
    message: 'name should be a string',
  })
  @IsNotEmpty({
    message: 'brand should be provided',
  })
  brand: string;

  @ApiProperty({
    description: 'The flavors that a coffee can have',
    example: [],
  })
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
