import { Brand } from "src/brand/entities/brand.entity";
import { UuidPlugin } from "src/plugins/uuid.plugin";

export const BRANDS_SEED: Brand[] = [
  {
    id: UuidPlugin.generateUuid(),
    name: "KIA",
    createdAt: new Date().getTime()
  },
  {
    id: UuidPlugin.generateUuid(),
    name: "Nissan",
    createdAt: new Date().getTime()
  },
  {
    id: UuidPlugin.generateUuid(),
    name: "Toyota",
    createdAt: new Date().getTime()
  },
  {
    id: UuidPlugin.generateUuid(),
    name: "Honda",
    createdAt: new Date().getTime()
  }
]