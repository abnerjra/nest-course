import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { CommonModule } from 'src/common/common.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [FileController],
  providers: [FileService],
  imports: [
    CommonModule,
    ConfigModule
  ]
})
export class FileModule { }
