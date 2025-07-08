import { Car } from "src/car/interfaces/car.interface";
import { UuidPlugin } from "src/plugins/uuid.plugin";

export const CARS_SEED: Car[] = [
  {
    id: UuidPlugin.generateUuid(),
    brand: "Toyota",
    model: "Corolla"
  },
  {
    id: UuidPlugin.generateUuid(),
    brand: "KIA",
    model: "Sportage"
  },
  {
    id: UuidPlugin.generateUuid(),
    brand: "Nissan",
    model: "Versa"
  },
  {
    id: UuidPlugin.generateUuid(),
    brand: "Honda",
    model: "Civic"
  }
]