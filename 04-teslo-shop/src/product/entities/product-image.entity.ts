import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Product } from "./product.entity";

// Colocar nombre especifico a la tabla
// @Entity({ name: 'product_images' })
@Entity()
export class ProductImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  url: string;

  //* Relacion Muchos a Uno
  @ManyToOne(
    () => Product,
    (product) => product.images,
    { onDelete: 'CASCADE' }
  )
  product: Product;

  //* Columna para borrado logico
  // @DeleteDateColumn()
  // deleteAt?: Date;
}