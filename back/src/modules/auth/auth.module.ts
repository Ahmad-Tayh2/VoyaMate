import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { MailService } from './mailService/mail.service';

@Module({
    imports: [UserModule],
    controllers: [AuthController],
    providers: [AuthService,MailService],
  })
  export class AuthModule {}
