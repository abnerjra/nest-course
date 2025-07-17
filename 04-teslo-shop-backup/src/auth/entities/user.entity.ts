import { ApiProperty } from "@nestjs/swagger";
import { Product } from "src/product/entities";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

@Entity()
export class User {
  @ApiProperty({
    type: String,
    description: 'User ID',
    uniqueItems: true,
    example: '2535935f-c399-419f-91a9-bc4198b90a1f'
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    type: String,
    description: 'User email',
    uniqueItems: true,
    example: 'user.one@example.com'
  })
  @Column('text', {
    unique: true,
    nullable: false
  })
  email: string;

  @ApiProperty({
    type: String,
    description: 'User password',
    example: 'Abc12345'
  })
  @Column('text', {
    nullable: false,
    select: false
  })
  password: string;

  @ApiProperty({
    type: String,
    description: 'User name',
    example: 'User One'
  })
  @Column('text', {
    nullable: false
  })
  fullName: string;

  @ApiProperty({
    type: Boolean,
    description: 'User active',
    default: true
  })
  @Column('bool', {
    default: true
  })
  isActive: boolean;

  @ApiProperty({
    type: String,
    description: 'User role',
    example: ['user', 'admin', 'super-user'],
    default: ['user']
  })
  @Column({
    type: 'text',
    array: true,
    default: ['user']
  })
  roles: string[];

  @OneToMany(
    () => Product,
    (product) => product.user
  )
  product: Product;

  @CreateDateColumn({
    name: 'created_at',
    select: false
  })
  createdAt: Date

  @UpdateDateColumn({
    name: 'updated_at',
    select: false
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    select: false
  })
  deletedAt?: Date;

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}
