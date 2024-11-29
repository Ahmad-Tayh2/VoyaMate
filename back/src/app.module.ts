import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthController } from './modules/auth/auth.controller';
import { AuthService } from './modules/auth/auth.service';
import { MailService } from './modules/auth/mailService/mail.service';
import { JwtModule } from '@nestjs/jwt';
import { ActivityModule } from './modules/activity/activity.module';
import { ItineraryModule } from './modules/itinerary/itinerary.module';
import { CheckpointModule } from './modules/checkpoint/checkpoint.module';





@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_DATABASE'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'], //autoLoadEntities: true,
          synchronize: true,
          logging:true,
        };
      },
    }),
    UserModule,
    AuthModule,
    JwtModule,
    ItineraryModule,
    CheckpointModule,
    ActivityModule


  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, MailService],
})
export class AppModule {}