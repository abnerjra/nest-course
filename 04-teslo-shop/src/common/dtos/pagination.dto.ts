import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto {
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @IsPositive()
  @Min(1)
  @Type(() => Number)
  offset?: number;
}