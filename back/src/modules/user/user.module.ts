import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { MailService } from '../auth/mailService/mail.service';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, MailService],
  controllers: [UserController],
  exports: [UserService, MailService], //so other modules can use it
})
export class UserModule {}
