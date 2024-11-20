import { Module } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity } from './entities/activity.entity';
import { Checkpoint } from './entities/Checkpoints.entity';
import { MulterModule } from '@nestjs/platform-express';
import { FileStorageService } from 'src/helper/FileStorageservice';
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
