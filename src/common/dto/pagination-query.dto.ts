import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive({
    message: 'limit should be positive',
  })
  @Type(() => Number)
  limit: number;

  @IsOptional()
  @IsPositive({
    message: 'offset should be positive',
  })
  @Type(() => Number)
  offset: number;
}
