import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn
} from "typeorm";

@Entity()
export class Product {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true
  })
  title: string;

  @Column('float', {
    default: 0
  })
  price: number;

  @Column({
    type: 'text',
    nullable: true
  })
  description: string;

  @Column({
    type: 'text',
    unique: true
  })
  slug: string;

  @Column('int', {
    default: 0
  })
  stock: number;

  @Column({
    type: 'text',
    array: true
  })
  sizes: string[];

  @Column('text')
  gender: string;

  @Column({
    type: 'text',
    array: true,
    default: []
  })
  tags: string[]
  // images

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
