import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('bootstrap');

  // Definición de prefijo global
  app.setGlobalPrefix('api');

  // Validacion de pipes a nivel de aplicacion
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remueve todo lo que no esta incluido en el DTO
      forbidNonWhitelisted: true, // Valida los campos definidos en el DTO
    })
  );

  const options = new DocumentBuilder().addBearerAuth();

  const config = new DocumentBuilder()
    .setTitle('Teslo RESTFul API')
    .setDescription('Teslo shoop endpoints')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, documentFactory);

  await app.listen(process.env.PORT!);
  logger.log(`App running in port ${process.env.PORT}`)
}
bootstrap();
