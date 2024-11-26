import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Checkpoint } from './checkpoint.entity';
import { CheckpointService } from './checkpoint.service';
import { CheckpointController } from './checkpoint.controller';
import { Itinerary } from '../itinerary/itinerary.entity';
import { Activity } from '../activity/entities/activity.entity';



@Module({
  imports: [TypeOrmModule.forFeature([Checkpoint,Itinerary,Activity])],

  controllers: [CheckpointController],
  providers: [CheckpointService],
})
export class CheckpointModule {}
