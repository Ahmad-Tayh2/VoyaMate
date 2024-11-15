import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // Allowed origins
    methods: 'GET,POST,PUT,DELETE', // Allowed HTTP methods
    allowedHeaders: 'Content-Type,Authorization', // Allowed headers
    credentials: true, // Allow credentials like cookies
  });
  app.useGlobalPipes(new ValidationPipe({
    
      whitelist: true, 
      forbidNonWhitelisted: true,
    
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
