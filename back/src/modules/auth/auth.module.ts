import { Module } from '@nestjs/common';
import { SignupController } from './controllers/signup/signup.controller';
import { SignupService } from './services/signup/signup.service';
import { UserModule } from '../user/user.module';

@Module({
    imports: [UserModule],
    controllers: [SignupController],
    providers: [SignupService],
  })
  export class AuthModule {}
