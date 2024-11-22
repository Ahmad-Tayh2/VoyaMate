import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Itinerary } from './itinerary.entity';
import { ItineraryService } from './itinerary.service';
import { ItineraryController } from './test/itinerary.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Itinerary]),UserModule],
    providers: [ItineraryService],
    exports: [ItineraryService],
    controllers: [ItineraryController]
})
export class ItineraryModule {}
