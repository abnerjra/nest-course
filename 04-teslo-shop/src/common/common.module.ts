import { Module } from '@nestjs/common';
import { UuidAdapter } from './adapters/uuid.adapter';
import { BcryptAdapter } from './adapters/bcrypt.adapter';

@Module({
  providers: [
    UuidAdapter,
    BcryptAdapter
  ],
  exports: [
    UuidAdapter,
    BcryptAdapter
  ]
})
export class CommonModule { }
