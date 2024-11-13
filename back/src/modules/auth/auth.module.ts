import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UserModule } from '../user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';  
import { MailService } from './mailservice/mailservice.service';

@Module({
  imports: [
    UserModule,
    PassportModule,
    ConfigModule,  
    JwtModule.registerAsync({
      imports: [ConfigModule], // 
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('SECRET_KEY'), 
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService], 
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, MailService],
})
export class AuthModule {}
