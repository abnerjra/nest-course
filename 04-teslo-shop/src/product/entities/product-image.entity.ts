import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Product } from "./product.entity";

@Entity()
export class ProductImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  url: string;

  //* Relacion Muchos a Uno
  @ManyToOne(
    () => Product,
    (product) => product.images
  )
  product: Product;
}