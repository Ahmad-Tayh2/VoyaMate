import { Itinerary } from '../itinerary.entity';
import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards, Request, Delete, Query } from '@nestjs/common';
import { ItineraryService } from '../itinerary.service';
import { UserService } from 'src/modules/user/user.service';
import { AddItineraryDTO } from '../dtos/addItinerary.dto';
import { Response } from '../itinerary.service'
import { JwtAuthGuard } from '../../auth/GUARD/auth.guard'
import { IsOwnerGuard } from '../guards/is-owner.guard';

interface AddMemberRequest{
    itineraryId: number;
    userId: number;
}

interface ItineraryResponse{
    id: number;
    name: string;
    description: string;
    budget: number;
    ownerId?:number,
    membersIds: number[];
}

//This is just to test the CRUD operations of the itinerary

@Controller('/api/itinerary')
export class ItineraryController {
    constructor(private readonly itineraryService: ItineraryService, private readonly userService: UserService) 
    {}

    @UseGuards(JwtAuthGuard)
    @Post("/create")
    async getItineraries(@Request() req, @Body() data:AddItineraryDTO): Promise<ItineraryResponse>{
        data.ownerId=req.user.userId;
        const itinerary=await this.itineraryService.createItinerary(data);
        return {
            id: itinerary.id,
            name: itinerary.name,
            description: itinerary.description,
            budget: itinerary.budget,
            membersIds: []
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get("/get/:id")
    async getItineraryById(@Param('id') itinraryId:number): Promise<ItineraryResponse> {
        const itinerary=await this.itineraryService.findItineraryById(itinraryId);
        if (!itinerary) {
            return null;
        }
        return {
            id: itinerary.id,
            name: itinerary.name,
            description: itinerary.description,
            budget: itinerary.budget,
            ownerId: itinerary.owner?.id,
            membersIds: itinerary.members?.map(m=>m.id)
       }
    }
    @UseGuards(JwtAuthGuard, IsOwnerGuard)
    @Delete("/delete/:id")
    async deleteItinerary(@Param('id') id:number): Promise<Response>{      
        return await this.itineraryService.deleteItinerary(id);
    }

    @Get("/filter")
    async getItinerariesbyFilter(@Query() query:Record<string,any>): Promise<ItineraryResponse[]> {
        try{
        const itineraries= await this.itineraryService.getItinerariesByFilter(query);
        return (
            itineraries.map(it=>({
                id: it.id,
                name: it.name,
                description: it.description,
                budget: it.budget,
                ownerId: it.owner?.id,
                membersIds: it.members?.map(m=>m.id)
            }))
        )
        }
        catch(e){
            console.error(e);
            throw new HttpException("BAD QUERY", HttpStatus.BAD_REQUEST);
        }
    }

    @Post("/add-member")
    async addMember(@Body() data:AddMemberRequest): Promise<Response>{
        return await this.itineraryService.addMember(data.itineraryId, data.userId)
    }

    // @Put("/api/update-it/:id")
    // async updateItinerary(@Param('id') iteneraryId:number): Promise<Response>{
    //     const owner=await this.userService.findUserById(ownerId);
    //     const it=await this.itineraryService.findItineraryById(id);
    //     // it.owner=owner;
    //     await this.itineraryService.updateItinerary(it);
    //     return {success:true, message:'Itinerary updated successfully'};
    // }
    

}