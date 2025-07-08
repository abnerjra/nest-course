import { Module } from '@nestjs/common';
import { CarModule } from './car/car.module';
import { BrandModule } from './brand/brand.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [CarModule, BrandModule, SeedModule],
  controllers: [],
  providers: [],
  exports: []
})
export class AppModule { }
