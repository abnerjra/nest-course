import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto {
  
  @ApiProperty({
    default: 10,
    description: 'Number of items to return per page',
  })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit?: number;

  @ApiProperty({
    default: 1,
    description: 'Number of items to skip for pagination',
  })
  @IsOptional()
  @IsPositive()
  @Min(1)
  @Type(() => Number)
  offset?: number;
}