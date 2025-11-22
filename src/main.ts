import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';
import passport from 'passport';
import * as dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:8080',
    credentials: true,
  });

  app.use(passport.initialize());
  app.use(cookieParser());

  app.useGlobalPipes(
  new ValidationPipe({
    transform: true, 
    whitelist: true, 
  }),
);

  await app.listen(3000);
}
bootstrap();
