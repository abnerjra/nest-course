import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommonModule } from 'src/common/common.module';

import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product, ProductImage } from './entities';


@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [
    TypeOrmModule.forFeature([Product, ProductImage]),
    CommonModule
  ]
})
export class ProductModule { }
