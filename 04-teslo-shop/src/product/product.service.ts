import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { UuidAdapter } from 'src/common/adapters/uuid.adapter';

@Injectable()
export class ProductService {

  private readonly logger = new Logger('ProductService');

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly uuidAdapter: UuidAdapter
  ) { }


  async create(createProductDto: CreateProductDto) {
    try {
      const product = this.productRepository.create(createProductDto);
      // Guardar en BD
      await this.productRepository.save(product);
      return product;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    const page = (offset > 0) ? offset - 1 : offset;
    return this.productRepository.find({
      take: limit,
      skip: page,
      // TODO: relaciones
    });
  }

  async findOne(term: string) {
    let product: Product | null = null;
    if (this.uuidAdapter.validateUuid(term)) {
      product = await this.productRepository.findOneBy({ id: term });
    } else {
      const query = this.productRepository.createQueryBuilder();
      product = await query.where(`lower(title)=:title or slug=:slug`, {
        title: term.toLowerCase(),
        slug: term.toLowerCase()
      }).getOne();
    }

    if (!product) throw new NotFoundException(`Product with ${term} not found`);
    return product
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
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
}
