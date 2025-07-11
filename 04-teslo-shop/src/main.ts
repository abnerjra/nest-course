import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Definición de prefijo global
  app.setGlobalPrefix('api');

  // Validacion de pipes a nivel de aplicacion
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remueve todo lo que no esta incluido en el DTO
      forbidNonWhitelisted: true, // Valida los campos definidos en el DTO
      transform: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  );

  await app.listen(process.env.PORT!);
}
bootstrap();
