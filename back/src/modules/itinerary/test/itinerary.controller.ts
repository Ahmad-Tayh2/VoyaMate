import { Itinerary } from '../itinerary.entity';
import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ItineraryService } from '../itinerary.service';
import { UserService } from 'src/modules/user/user.service';
import { AddItineraryDTO } from '../dtos/add.itinerary.dto';
import { Response } from '../itinerary.service'

interface AddMemberRequest{
    itineraryId: number;
    userId: number;
}

//This is just to test the CRUD operations of the itinerary

@Controller('itinerary')
export class ItineraryController {
    constructor(private readonly itineraryService: ItineraryService, private readonly userService: UserService) 
    {}

    @Post("/api/test")
    async getItineraries(@Body() data:AddItineraryDTO): Promise<Itinerary>{
        return await this.itineraryService.createItinerary(data);
    }

    @Get("/api/get-all/:id")
    async getAllItinerariesbyOwnerId(@Param('id') id: number): Promise<Itinerary[]> {
        try{
            const its=await this.itineraryService.getItinerariesByOwnerId(id);
            return its;
        } catch(e){
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Post("/api/add-member")
    async addMember(@Body() data:AddMemberRequest): Promise<Response>{
        return await this.itineraryService.addMember(data.itineraryId, data.userId)
    }

    @Put("/api/update-it/:id")
    async updateItinerary(@Param('id') id:number, @Body() ownerId:number): Promise<Response>{
        const owner=await this.userService.findUserById(ownerId);
        const it=await this.itineraryService.findItineraryById(id);
        it.owner=owner;
        await this.itineraryService.updateItinerary(it);
        return {success:true, message:'Itinerary updated successfully'};
    }

}