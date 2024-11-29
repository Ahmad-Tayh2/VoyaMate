import { Checkpoint } from './checkpoint.entity';
import { CheckpointService } from './checkpoint.service';
import { CheckpointController } from './checkpoint.controller';
import { ItineraryModule } from '../itinerary/itinerary.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ItineraryService } from '../itinerary/itinerary.service';


@Module({
  imports: [TypeOrmModule.forFeature([Checkpoint]),ItineraryModule],

  controllers: [CheckpointController],
  providers: [CheckpointService],
})
export class CheckpointModule {}
