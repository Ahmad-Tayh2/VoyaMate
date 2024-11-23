import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Itinerary } from './itinerary.entity';
import { AddOrUpdateItineraryDTO } from './dtos/add-itinerary.dto';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { ItineraryResponseDto } from './dtos/itinerary-response.dto';
import { PaginatedResponseDto } from './dtos/paginated-response.dto';
import { transformItineraryToDto } from 'src/helper/toItineraryDto';
import { ApiResponse } from '../../shared/interfaces/response.interface';


@Injectable()
export class ItineraryService {

    constructor(
        @InjectRepository(Itinerary)
        private repository: Repository<Itinerary>,
        private userService : UserService
    ){}

    async createItinerary(userId: number, itineraryDTO: AddOrUpdateItineraryDTO):Promise<ItineraryResponseDto> {
        const user=await this.userService.findUserById(userId);
        const newItinerary=this.repository.create({
            name: itineraryDTO.name,
            description: itineraryDTO.description,
            budget: itineraryDTO.budget,
            owner: user
        })
        const itinerary= await this.repository.save(newItinerary)
        return transformItineraryToDto(itinerary)
    }
    
    //update name or desscription or budget
    async updateItinerary(itineraryId:number,data:AddOrUpdateItineraryDTO): Promise<ItineraryResponseDto> {
        let itinerary = await this.repository.findOne({ where :{id: itineraryId}, relations: ['members', 'owner'] });
        const newItinerary = { ...itinerary, ...data };
        const updatedItinerary = await this.repository.save(newItinerary);
        return transformItineraryToDto(updatedItinerary);
    }

    async findItineraryById(itineraryId: number): Promise<ItineraryResponseDto> {
        const itinerary = await this.repository.findOne({ where :{id: itineraryId}, relations: ['members', 'owner'] });
        if (!itinerary){
            throw new NotFoundException("Itinerary not found")
        }
        return transformItineraryToDto(itinerary);
    }

    async getItinerariesByOwnerId(userId:number): Promise<ItineraryResponseDto[]> {
        const user=await this.userService.findUserById(userId);
        if (!user){
            throw new Error('User not found');
        }
        const itinerary = await this.repository.find({ where :{owner:{id:userId}} , relations: ['members','owner']});
        return itinerary.map(itinerary =>transformItineraryToDto(itinerary));
    }

    async getItinerariesByFilter(filter: Record<string,any>): Promise<PaginatedResponseDto> {
        const { page, limit, userId, name, budget } = filter;

        let whereConditions: any = {};

        if (userId) {
            const user = await this.userService.findUserById(filter.userId);

            if (user){
            whereConditions = { owner: { id:filter.userId } };
            }
        }

        if (name){
            whereConditions.name=filter.name;
        }
        if (budget){
            whereConditions.budget= filter.budget;
        }

       const  [itineraries,totalElementsNb]=await this.repository.findAndCount({
         where: whereConditions, relations: ['members','owner'],
         skip: (page-1)*limit,
         take: limit
        })

        const filteredIineraries=itineraries.map( it=>transformItineraryToDto(it))
        const totalPagesNb = Math.ceil(totalElementsNb / limit);
        return {
            data: filteredIineraries,
            metadata: {
                totalElementsNb,
                totalPagesNb,
                currentPageNb:page,
                elementsPerPageNb:limit
            }
        }

    }

    async deleteItinerary(itineraryId: number): Promise<ApiResponse<null>> {
        const result=await this.repository.delete(itineraryId);
        if (result.affected===0){
            return { success: false, message:'Itinerary not found'};
        }
        return {success:true, message:'Itinerary deleted successfully'};
    }

    async addMember(itineraryId: number, memberId: number): Promise<ApiResponse<null>> {
        const itinerary = await this.repository.findOne({ where :{id: itineraryId}, relations: ['members', 'owner'] });
        const user: User = await this.userService.findUserById(memberId);
       
        if (!itinerary.members.some(member => member.id === user.id) && itinerary.owner.id !== user.id && !user.memberItineraries?.some(memberItinerary => memberItinerary.id === itinerary.id)) {
            itinerary.members.push(user);
            user.memberItineraries.push(itinerary);
            
            await this.repository.save(itinerary);
            await this.userService.updateUser(user);

          } else {
            return {success: false ,message:"The user is already a member or an owner." }
          }
        return {success: true,message:"Member added successfully to the itinerary" }
    }


}
 