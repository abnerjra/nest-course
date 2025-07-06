import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Patch,
    Post
} from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto, UpdateCarDto } from './dtos';

@Controller('car')
// @UsePipes(ValidationPipe)
export class CarController {

    constructor(
        private readonly service: CarService
    ) { }

    @Get()
    getAllCars() {
        return this.service.findAll();
    }

    @Get(':id')
    getCarById(@Param('id', ParseUUIDPipe) id: string) {
        return this.service.findOneById(id)
    }

    @Post()
    createCar(@Body() dto: CreateCarDto) {
        return this.service.create(dto);
    }

    @Patch(':id')
    updateCar(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() dto: UpdateCarDto
    ) {
        return this.service.update(id, dto);
    }

    @Delete(':id')
    deleteCar(
        @Param('id', ParseUUIDPipe) id: string
    ) {
        return this.service.delete(id);
    }
}
