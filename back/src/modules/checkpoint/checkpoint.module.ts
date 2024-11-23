import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Checkpoint } from './checkpoint.entity';
import { CheckpointService } from './checkpoint.service';
import { CheckpointController } from './checkpoint.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Checkpoint])],
  controllers: [CheckpointController],
  providers: [CheckpointService],
})
export class CheckpointModule {}
