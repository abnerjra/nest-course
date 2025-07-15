import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DataSource, Repository } from 'typeorm';

import { PaginationDto } from '../common/dtos/pagination.dto';
import { UuidAdapter } from 'src/common/adapters/uuid.adapter';

import { CreateProductDto, UpdateProductDto } from './dto';
import { Product, ProductImage } from './entities';
import { url } from 'inspector';

@Injectable()
export class ProductService {

  private readonly logger = new Logger('ProductService');

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,
    private readonly uuidAdapter: UuidAdapter,
    private readonly datasource: DataSource
  ) { }


  async create(createProductDto: CreateProductDto) {
    try {
      const { images = [], ...productData } = createProductDto;

      const product = this.productRepository.create({
        ...productData,
        images: images.map(image => this.productImageRepository.create({ url: image }))
      });
      // Guardar en BD
      await this.productRepository.save(product);
      return { ...product, images };
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    const page = (offset > 0) ? offset - 1 : offset;
    const products = await this.productRepository.find({
      take: limit,
      skip: page,
      relations: {
        images: true
      }
    });

    return products.map(product => ({
      ...product,
      images: product.images?.map(img => img.url)
    }));
  }

  async findOne(term: string) {
    let product: Product | null = null;
    if (this.uuidAdapter.validateUuid(term)) {
      product = await this.productRepository.findOneBy({ id: term });
    } else {
      const query = this.productRepository.createQueryBuilder('prod');
      product = await query.where(`lower(title)=:title or slug=:slug`, {
        title: term.toLowerCase(),
        slug: term.toLowerCase()
      })
        .leftJoinAndSelect('prod.images', 'prodImages')
        .getOne();
    }

    if (!product) throw new NotFoundException(`Product with ${term} not found`);
    return product;
  }

  async findOneLain(term: string) {
    const { images = [], ...product } = await this.findOne(term);
    return {
      ...product,
      images: images.map(img => img.url)
    };
  }

  // uso de transacciones
  async update(id: string, updateProductDto: UpdateProductDto) {
    const { images, ...productUpdate } = updateProductDto;
    const product = await this.productRepository.preload({ id, ...productUpdate });

    if (!product) throw new NotFoundException(`Product with id: ${id} not found`);

    // Create query runner
    const queryRunner = this.datasource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if (images) {
        // Borrado fisico
        await queryRunner.manager.delete(ProductImage, { product: { id } });
        // Bortrado logico
        // await queryRunner.manager.softDelete(ProductImage, { product: { id } });

        product.images = images.map(image => this.productImageRepository.create({ url: image }));
      }

      await queryRunner.manager.save(product);

      // await this.productRepository.save(product);
      await queryRunner.commitTransaction();
      await queryRunner.release();

      return this.findOneLain(id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();

      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail)
    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error, check server log')
  }

  async deleteAllProducts() {
    const query = this.productRepository.createQueryBuilder('product');

    try {
      return await query
        .delete()
        .where({})
        .execute();
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }
}
