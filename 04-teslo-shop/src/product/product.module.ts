import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommonModule } from 'src/common/common.module';

import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product, ProductImage } from './entities';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [
    TypeOrmModule.forFeature([Product, ProductImage]),
    CommonModule,
    AuthModule
  ],
  exports: [
    ProductService,
    TypeOrmModule
  ]
})
export class ProductModule { }
