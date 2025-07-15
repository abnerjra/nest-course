import { Injectable } from '@nestjs/common';

import { ProductService } from 'src/product/product.service';
import { initialData } from './data/product-seeder';

@Injectable()
export class SeedService {
  constructor(
    private readonly productService: ProductService
  ) { }

  async runSeed() {
    await this.productsSeeder();
    return `Seed executed`;
  }

  private async productsSeeder() {
    await this.productService.deleteAllProducts();

    const products = initialData.products;

    const insertPromise: Promise<any>[] = [];
    products.forEach(product => {
      insertPromise.push(this.productService.create(product));
    });

    await Promise.all(insertPromise);

    return true;
  }
}
