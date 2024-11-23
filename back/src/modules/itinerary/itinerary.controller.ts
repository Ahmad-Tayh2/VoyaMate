import { Body, Controller, Get, HttpException, HttpStatus, Param, Post,UseGuards, Request, Delete, Query, Patch } from '@nestjs/common';
import { ItineraryService } from './itinerary.service';
import { AddOrUpdateItineraryDTO } from './dtos/addItinerary.dto';
import { MemberRequestMail } from '../../shared/interfaces/email.interface';
import { ApiResponse } from 'src/shared/interfaces/response.interface';
import { JwtAuthGuard } from '../auth/GUARD/auth.guard'
import { IsOwnerGuard } from './guards/is-owner.guard';
import { ItineraryResponseDto } from './dtos/itineraryResponse.dto';
import { PaginatedResponseDto } from './dtos/paginatedResponse.dto';
import { MailService } from '../auth/mailService/mail.service';
import { IsVerifiedGuard } from './guards/is-verified.guard';
import { FilterItinerariesDto } from './dtos/filterItineraries.dto';
import { addMemberDto } from './dtos/addMember.dto';
import { AuthService } from '../auth/auth.service';



@Controller('/api/itinerary')
@UseGuards(JwtAuthGuard,IsVerifiedGuard)
export class ItineraryController {
    constructor(
        private readonly itineraryService: ItineraryService,
        private readonly mailService: MailService,
        private readonly authService: AuthService
    ) 
    {}

    @Post("/create")
    async createItinerary(@Request() req, @Body() data:AddOrUpdateItineraryDTO): Promise<ItineraryResponseDto>{
        return await this.itineraryService.createItinerary(req.user.userId, data);        
    }

    @Get("/get/:id")
    async getItineraryById(@Param('id') itinraryId:number): Promise<ItineraryResponseDto> {
        return await this.itineraryService.findItineraryById(itinraryId);
    }

    @UseGuards(IsOwnerGuard)
    @Delete("/delete/:id")
    async deleteItinerary(@Param('id') itinraryId:number): Promise<ApiResponse<null>>{      
        return await this.itineraryService.deleteItinerary(itinraryId);
    }

    @Get("/filter")
    async getItinerariesbyFilter(@Query() query:FilterItinerariesDto): Promise<PaginatedResponseDto> {
        return await this.itineraryService.getItinerariesByFilter(query);
    }

    @UseGuards(IsOwnerGuard)
    @Patch("/invite-member/:id")
    async inviteMember(@Body() data:addMemberDto, @Param("id") itineraryId:number): Promise<ApiResponse<null>>{
        const senMailObject:MemberRequestMail={
            type:"member",
            to: data.memberEmail,
        }
        try{
            const token=this.authService.generateToken({
                memberId:data.memberId,
                itineraryId
            },"1h")

            await this.mailService.sendConfirmationMail(senMailObject,token);
            return {
                success:true,
                message:"Invitation mail sent successfully"
            }
        }catch(err){
            throw new HttpException("Error while inviting user", HttpStatus.BAD_REQUEST);
        }
   }


   @Get("/confirm-member")
    async confirmMember(@Query("token") token: string): Promise<ApiResponse<null>> {
         try {
              const payload=await this.authService.verifyToken(token)
              {
                return await this.itineraryService.addMember(payload.itineraryId,payload.memberId)
              }
         } catch (err) {
              console.error("Error while confirming user email",err)
              throw new HttpException(
                {
                message:"Error while verifying user email",
                errorMessage:err.message || "Unknown error",
                },
                HttpStatus.INTERNAL_SERVER_ERROR
              );
         }
        }

        @UseGuards(IsOwnerGuard)
        @Patch("/update/:id")
        async updateItinerary(@Param('id') itineraryId:number, @Body() data:AddOrUpdateItineraryDTO): Promise<ItineraryResponseDto>{
            return await this.itineraryService.updateItinerary(itineraryId, data)
    
        }
}