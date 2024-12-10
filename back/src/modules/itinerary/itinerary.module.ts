import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Itinerary } from './itinerary.entity';
import { ItineraryService } from './itinerary.service';
import { ItineraryController } from './itinerary.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [TypeOrmModule.forFeature([Itinerary]),UserModule,AuthModule],
    providers: [ItineraryService],
    exports: [ItineraryService],
    controllers: [ItineraryController]
})
export class ItineraryModule {}
