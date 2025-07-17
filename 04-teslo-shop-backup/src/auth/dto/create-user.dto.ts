import {
  ApiProperty
} from "@nestjs/swagger";

import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength
} from "class-validator";

export class CreateUserDto {

  @ApiProperty({
    type: String,
    description: 'The email of the user',
    uniqueItems: true,
    example: 'user.one@example.com'
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    description: 'The password of the user',
    example: 'Abc12345'
  })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(
    /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'The password must have a Uppercase, lowercase letter and a number'
  })
  password: string;

  @ApiProperty({
    type: String,
    description: 'The full name of the user',
    example: 'User One'
  })
  @IsString()
  @MinLength(5)
  fullName: string;
}