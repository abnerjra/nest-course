import { Repository } from 'typeorm';

import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BcryptAdapter } from 'src/common/adapters/bcrypt.adapter';

import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly bcrypt: BcryptAdapter
  ) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;
      const user = this.userRepository.create({
        ...userData,
        password: this.bcrypt.createHash(password)
      });
      await this.userRepository.save(user)

      // TODO: retornar JWT

      return user;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true }
    });

    if (!user) throw new UnauthorizedException('Credentials are not valid (email)');

    if (!this.bcrypt.verifyHash(password, user.password)) throw new UnauthorizedException('Credentials are not valid (password)');

    // TODO: retornar JWT

    return user;
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    console.log(error);
    throw new InternalServerErrorException('Please check server logs  ');
  }
}
