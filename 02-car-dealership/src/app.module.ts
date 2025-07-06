import { Module } from '@nestjs/common';
import { CarModule } from './car/car.module';

@Module({
  imports: [CarModule],
  controllers: [],
  providers: [],
  exports: []
})
export class AppModule { }
