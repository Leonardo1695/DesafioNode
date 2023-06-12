import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import User from './user/entity/user.entity';
import { UserRepository } from './user/repository/user.repository';
import { addDefaultAdmin } from './shared/utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  app.enableCors();
  const user = app.get<UserRepository>(getRepositoryToken(User)); // You need to pass the entity file to typeorm
  await addDefaultAdmin(user); // Pass the user model, and call the function
  await app.listen(3000);
}
bootstrap();
