import { ApiProperty } from "@nestjs/swagger";
import {
  ArrayNotEmpty,
  IsArray,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength
} from "class-validator";

export class CreateProductDto {

  @ApiProperty({
    required: true,
    example: 'Kids Cybertruck Tee',
    description: 'Product title (unique)',
    nullable: false,
    minLength: 1,
  })
  @IsString()
  @MinLength(1)
  title: string;

  @ApiProperty({
    required: false,
    example: 25.99,
    description: 'Product price',
    nullable: false,
    default: 0,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @ApiProperty({
    required: false,
    example: 'lorem ipsum dolor sit amet, consectetur adipiscing elit',
    description: 'Product description',
    nullable: true
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    required: false,
    example: 'kidscybertrucktee',
    description: 'Product SLUG - for SEO',
    nullable: true
  })
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiProperty({
    required: false,
    example: 10,
    description: 'Product stock',
    nullable: false,
    default: 0
  })
  @IsInt()
  @IsPositive()
  @IsOptional()
  stock?: number;

  @ApiProperty({
    required: true,
    example: ['X', 'XS', 'M'],
    description: 'Product sizes',
    nullable: false,
  })
  @IsString({ each: true })
  @IsArray()
  sizes: string[];

  @ApiProperty({
    required: true,
    example: ['men', 'women', 'kid', 'unisex'],
    description: 'Product gender',
    nullable: false,
  })
  @IsIn(['men', 'women', 'kid', 'unisex'])
  gender: string;

  @ApiProperty({
    required: false,
    example: ['shirt', 't-shirt'],
    description: 'Product tags',
    nullable: false,
  })
  @IsOptional()
  @IsString({ each: true })
  @IsArray()
  @ArrayNotEmpty()
  @IsNotEmpty({ each: true })
  tags?: string[]

  @ApiProperty({
    required: false,
    example: ['http://1.jpg'],
    description: 'Product images',
    nullable: false,
  })
  @IsOptional()
  @IsString({ each: true })
  @IsArray()
  images?: string[]
}
