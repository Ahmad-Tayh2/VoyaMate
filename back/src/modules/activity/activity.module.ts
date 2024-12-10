import { Module } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity } from './entities/activity.entity';
import { MulterModule } from '@nestjs/platform-express';
import { FileStorageService } from 'src/helper/FileStorageservice';
import { Checkpoint } from '../checkpoint/checkpoint.entity';
@Module({
  imports:[TypeOrmModule.forFeature([Checkpoint,Activity]),
  MulterModule.register({
    dest: './../../uploads',
  }),
],
  controllers: [ActivityController],
  providers: [ActivityService,FileStorageService],
})
export class ActivityModule {}
