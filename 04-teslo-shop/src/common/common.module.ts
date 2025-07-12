import { Module } from '@nestjs/common';
import { UuidAdapter } from './adapters/uuid.adapter';

@Module({
  providers: [UuidAdapter],
  exports: [UuidAdapter]
})
export class CommonModule { }
