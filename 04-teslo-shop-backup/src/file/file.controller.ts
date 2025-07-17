import { Response } from 'express';

import {
  Controller,
  Get,
  Post,
  Param,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Res
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

import { ApiTags } from '@nestjs/swagger';

import { diskStorage } from 'multer';

import { FileService } from './file.service';
import { fileFilter, fileNamer } from './helpers';

@ApiTags('File')
@Controller('file')
export class FileController {
  constructor(
    private readonly fileService: FileService,
    private readonly configService: ConfigService
  ) { }

  @Get('product/:imageName')
  findProductImage(
    @Res() res: Response,
    @Param('imageName') imageName: string
  ) {
    const path = this.fileService.getStaticProductImage(imageName);
    res.sendFile(path);
  }

  @Post('product')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: fileFilter,
    // limits: {fileSize: 1000}
    storage: diskStorage({
      destination: './storage/products',
      filename: fileNamer
    })
  }))
  uploadFile(
    @UploadedFile() file: Express.Multer.File
  ) {

    if (!file) throw new BadRequestException(`Make sure that file is an image`)

    const secureUrl = `${this.configService.get('HOST_API')}/file/product/${file.filename}`;

    return {
      secureUrl
    }
  }
}
