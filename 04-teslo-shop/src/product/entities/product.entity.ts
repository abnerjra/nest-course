import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";

import { ApiProperty } from "@nestjs/swagger";

import { ProductImage } from "./product-image.entity";
import { User } from "src/auth/entities/user.entity";

// Colocar nombre especifico a la tabla
// @Entity({ name: 'products' })
@Entity()
export class Product {

  @ApiProperty({
    example: '2535935f-c399-419f-91a9-bc4198b90a1f',
    description: 'Product ID',
    uniqueItems: true
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: "Men's 3D Large Wordmark Tee",
    description: 'Product Title',
    uniqueItems: true
  })
  @Column('text', {
    unique: true
  })
  title: string;

  @ApiProperty({
    example: 0,
    description: 'Product Price'
  })
  @Column('float', {
    default: 0
  })
  price: number;

  @ApiProperty({
    example: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    description: 'Product Description'
  })
  @ApiProperty()
  @Column({
    type: 'text',
    nullable: true
  })
  description: string;

  @ApiProperty({
    example: "mens-3d-large-wordmark-tee",
    description: 'Product SLUG - for SEO',
    uniqueItems: true
  })
  @ApiProperty()
  @Column({
    type: 'text',
    unique: true
  })
  slug: string;

  @ApiProperty({
    example: 10,
    description: 'Product stock',
    default: 0
  })
  @ApiProperty()
  @Column('int', {
    default: 0
  })
  stock: number;

  @ApiProperty({
    example: ['M', 'XL', 'XXL'],
    description: 'Product sizes'
  })
  @Column({
    type: 'text',
    array: true
  })
  sizes: string[];

  @ApiProperty({
    example: "men",
    description: 'Product gender'
  })
  @Column('text')
  gender: string;

  @ApiProperty({
    example: ['shirt', 't-shirt', 'hoddie'],
    description: 'Product gender'
  })
  @Column({
    type: 'text',
    array: true,
    default: []
  })
  tags: string[]

  // images
  @ApiProperty({
    example: ["http://1.jpg", "http://2.jpg"],
    description: 'Product images'
  })
  //* Relación de Uno a Muchos 
  @OneToMany(
    () => ProductImage,
    (productImage) => productImage.product,
    { cascade: true, eager: true }
  )
  images?: ProductImage[];

  @ManyToOne(
    () => User,
    (user) => user.product,
    { eager: true }
  )
  user: User;

  @BeforeInsert()
  checkSlugInsert() {
    if (!this.slug) {
      this.slug = this.title;
    }

    this.slug = this.slug.toLowerCase()
      .normalize('NFD')                 // Elimina acentos
      .replaceAll(/[\u0300-\u036f]/g, '')  // Elimina caracteres diacríticos
      .replaceAll(/[^a-z0-9\s-]/g, '')     // Elimina caracteres especiales
      .replaceAll(/\s+/g, ' ')             // Convierte múltiples espacios en uno solo
      .trim()
      .replaceAll(' ', '-')             // Reemplaza el único espacio por guion
      .replaceAll('--', '-');           // Evita guiones dobles
  }

  @BeforeUpdate()
  checkSlugUpdate() {
    this.slug = this.slug.toLowerCase()
      .normalize('NFD')
      .replaceAll(/[\u0300-\u036f]/g, '')
      .replaceAll(/[^a-z0-9\s-]/g, '')
      .replaceAll(/\s+/g, ' ')
      .trim()
      .replaceAll(' ', '-')
      .replaceAll('--', '-');
  }

}
