import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { ProductService } from 'src/product/product.service';
import { initialData } from './data/product-seeder';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class SeedService {
  constructor(
    private readonly productService: ProductService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  async runSeed() {
    await this.deleteTables();
    const firstUser = await this.usersSeeder();
    await this.productsSeeder(firstUser);
    return `Seed executed`;
  }

  private async deleteTables() {
    await this.productService.deleteAllProducts();

    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder.delete().where({}).execute();
  }

  private async usersSeeder() {
    const usersSeeders = initialData.users;
    const users: User[] = [];
    usersSeeders.forEach(user => {
      users.push(this.userRepository.create(user));
    });

    const user = await this.userRepository.save(users);
    return user[0];
  }

  private async productsSeeder(user: User) {
    await this.productService.deleteAllProducts();

    const products = initialData.products;

    const insertPromise: Promise<any>[] = [];
    products.forEach(product => {
      insertPromise.push(this.productService.create(product, user));
    });

    await Promise.all(insertPromise);

    return true;
  }
}
