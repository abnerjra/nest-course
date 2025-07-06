import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { UuidPlugin } from 'src/plugins/uuid.plugin';
import { CreateCarDto } from './dtos/create-car.dto';
import { UpdateCarDto } from './dtos/update-car.dto';

@Injectable()
export class CarService {

    private cars: Car[] = [
        {
            id: UuidPlugin.generateUuid(),
            brand: 'Toyota',
            model: 'Corolla'
        },
        {
            id: UuidPlugin.generateUuid(),
            brand: 'Honda',
            model: 'Civic'
        },
        {
            id: UuidPlugin.generateUuid(),
            brand: 'KIA',
            model: 'K3'
        }
    ];

    findAll() {
        return this.cars;
    }

    findOneById(id: string) {
        const car = this.cars.find(car => car.id === id);
        if (!car) throw new NotFoundException(`Car with id ${id} not found`);
        return car;
    }

    create(dto: CreateCarDto) {
        const id = UuidPlugin.generateUuid();
        const car: Car = {
            id,
            model: dto.model,
            brand: dto.brand
        };

        this.cars.push(car);
        return car;
    }

    update(id: string, dto: UpdateCarDto) {
        let carDB = this.findOneById(id);

        if (dto.id && dto.id !== id) throw new BadRequestException(`Car id not valid inside body`);

        this.cars = this.cars.map(car => {
            if (car.id === id) {
                carDB = { ...carDB, ...dto, id }
                return carDB;
            }

            return car;
        });

        return carDB;
    }

    delete(id: string) {
        this.findOneById(id);
        
        const indexOfCar = this.cars.findIndex(car => car.id === id)
        if (indexOfCar !== -1) this.cars.splice(indexOfCar, 1);
        
        // this.cars = this.cars.filter(car => car.id !== id);
        return;
    }
}
