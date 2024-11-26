import { Body, Controller, Get, HttpException, HttpStatus, Param, Post,UseGuards, Request, Delete, Query, Patch } from '@nestjs/common';
import { ItineraryService } from './itinerary.service';
import { AddOrUpdateItineraryDTO } from './dtos/add.itinerary.dto';
import { MemberRequestMail } from '../../shared/interfaces/email.interface';
import { ApiResponse } from 'src/shared/interfaces/response.interface';
import { JwtAuthGuard } from '../auth/GUARD/auth.guard'
import { IsOwnerGuard } from './guards/is-owner.guard';
import { ItineraryResponseDto } from './dtos/itinerary.response.dto';
import { PaginatedResponseDto } from './dtos/paginated.response.dto';
import { MailService } from '../auth/mailService/mail.service';
import { IsVerifiedGuard } from './guards/is-verified.guard';
import { FilterItinerariesDto } from './dtos/filter.itineraries.dto';
import { addMemberDto } from './dtos/add.member.dto';
import { AuthService } from '../auth/auth.service';



@Controller('itinerary')
@UseGuards(JwtAuthGuard,IsVerifiedGuard)
export class ItineraryController {
    constructor(
        private readonly itineraryService: ItineraryService,
        private readonly mailService: MailService,
        private readonly authService: AuthService
    ) 
    {}

    @Post()
    async createItinerary(@Request() req, @Body() data:AddOrUpdateItineraryDTO): Promise<ItineraryResponseDto>{
        return await this.itineraryService.createItinerary(req.user.userId, data);        
    }

    @Get()
    async getItinerariesbyFilter(@Query() query:FilterItinerariesDto): Promise<PaginatedResponseDto> {
        return await this.itineraryService.getItinerariesByFilter(query);
    }

    @Get(":id")
    async getItineraryById(@Param('id') itinraryId:number): Promise<ItineraryResponseDto> {
        return await this.itineraryService.findItineraryById(itinraryId);
    }

    @UseGuards(IsOwnerGuard)
    @Patch(":id")
    async updateItinerary(@Param('id') itineraryId:number, @Body() data:AddOrUpdateItineraryDTO): Promise<ItineraryResponseDto>{
        return await this.itineraryService.updateItinerary(itineraryId, data)

    }

    @UseGuards(IsOwnerGuard)
    @Delete(":id")
    async deleteItinerary(@Param('id') itinraryId:number): Promise<ApiResponse<null>>{      
        return await this.itineraryService.deleteItinerary(itinraryId);
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
                userId:data.memberId,
                itineraryId:itineraryId
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
                return await this.itineraryService.addMember(payload.itineraryId,payload.userId)
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
}