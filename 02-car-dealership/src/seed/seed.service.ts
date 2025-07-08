import { Injectable } from '@nestjs/common';
import { BrandService } from 'src/brand/brand.service';
import { CarService } from 'src/car/car.service';
import { CARS_SEED } from './data/cars.seed';
import { BRANDS_SEED } from './data/brands.seed';

@Injectable()
export class SeedService {

  constructor(
    private readonly carService: CarService,
    private readonly brandService: BrandService
  ) { }

  pupulateDB() {
    this.carService.fillCarsWithSeedData(CARS_SEED);
    this.brandService.fillBrandsWithSeedData(BRANDS_SEED);
    return "Seed executed";
  }
}
