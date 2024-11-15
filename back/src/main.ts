import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors({
    origin: configService.get<string>("FRONTEND_URL"),
    methods: 'GET,POST,PUT,DELETE', 
    // allowedHeaders: 'Content-Type,Authorization',
    credentials: true, 
  });
  app.useGlobalPipes(new ValidationPipe({

      whitelist: true, 
      forbidNonWhitelisted: true,

  }));

  await app.listen(configService.get<string>("BACKEND_PORT") ?? 3000);
}
bootstrap();
