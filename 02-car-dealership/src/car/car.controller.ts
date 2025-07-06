import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post
} from '@nestjs/common';
import { CarService } from './car.service';

@Controller('car')
export class CarController {

    constructor(
        private readonly service: CarService
    ) { }

    @Get()
    getAllCars() {
        return this.service.findAll();
    }

    @Get(':id')
    getCarById(@Param('id', ParseIntPipe) id: number) {
        console.log({ id });

        return this.service.findOneById(id)
    }

    @Post()
    createCar(@Body() body: any) {
        return body
    }

    @Patch(':id')
    updateCar(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: any
    ) {
        return body
    }

    @Delete(':id')
    deleteCar(
        @Param('id', ParseIntPipe) id: number
    ) {
        return { id, method: 'delete' }
    }
}
