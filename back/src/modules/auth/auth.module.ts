import { Module } from '@nestjs/common';
import { SignupController } from './controllers/signup/signup.controller';
import { SignupService } from './services/signup/signup.service';
import { UserModule } from '../user/user.module';
import { MailService } from './mailService/mail.service';

@Module({
    imports: [UserModule],
    controllers: [SignupController],
    providers: [SignupService,MailService],
  })
  export class AuthModule {}
