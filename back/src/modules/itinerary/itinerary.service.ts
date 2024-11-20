import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Itinerary } from './itinerary.entity';
import { AddItineraryDTO } from './dtos/addItinerary.dto';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

export interface Response {
    success: boolean;
    message: string;
}

@Injectable()
export class ItineraryService {

    constructor(
        @InjectRepository(Itinerary)
        private repository: Repository<Itinerary>,
        private userService : UserService
    ){}

    async createItinerary(itineraryDTO: AddItineraryDTO):Promise<Itinerary> {
        const user=await this.userService.findUserById(itineraryDTO.ownerId);
        if (!user){
            throw new Error('User not found');
        }
        const newItinerary=this.repository.create({
            name: itineraryDTO.name,
            description: itineraryDTO.description,
            budget: itineraryDTO.budget,
            owner: user
        })
        const savedItinerary= await this.repository.save(newItinerary)
        return savedItinerary;
    }

    async updateItinerary(itinerary: Itinerary): Promise<Itinerary> {
        const updatedItinerary = await this.repository.save(itinerary);
        return updatedItinerary;
    }

    async findItineraryById(itineraryId: number): Promise<Itinerary> {
        const itinerary = await this.repository.findOne({ where :{id: itineraryId}, relations: ['members', 'owner'] });
        return itinerary;
    }

    async getItinerariesByOwnerId(userId:number): Promise<Itinerary[]> {
        const user=await this.userService.findUserById(userId);
        if (!user){
            throw new Error('User not found');
        }
        const itinerary = await this.repository.find({ where :{owner:{id:userId}} , relations: ['members','owner']});
        return itinerary;
    }

    async getItinerariesByFilter(filter: Record<string,any>): Promise<Itinerary[]> {
        const validFilterKeys = ['name', 'budget', 'ownerId', 'userId']; 
        
        //check if the filter is valid
        const invalidKeys = Object.keys(filter).filter(key => !validFilterKeys.includes(key));
        if (invalidKeys.length > 0) {
            throw new Error("Invalid filter");
        }

        let whereConditions: any = {};

        //handle userId key
        if ("userId" in filter) {
            const user = await this.userService.findUserById(filter.userId);
            
            if (user){
            whereConditions = { owner: { id:filter.userId } };
            }
        }

        if ("name" in filter){
            whereConditions.name=filter.name;
        }
        if ("budget" in filter){
            whereConditions.budget= filter.budget;
        }

       const itinerariesFiltered=await this.repository.find({ where: whereConditions, relations: ['members','owner']})

        return itinerariesFiltered;
    }

    async deleteItinerary(itineraryId: number): Promise<Response> {
        const result=await this.repository.delete(itineraryId);
        if (result.affected===0){
            return { success: false, message:'Itinerary not found'};
        }
        return {success:true, message:'Itinerary deleted successfully'};
    }

    async addMember(itineraryId: number, userId: number): Promise<Response> {
        const itinerary : Itinerary= await this.findItineraryById(itineraryId);
        if (!itinerary){
            throw new Error('Itinerary not found');
        }
        const user: User = await this.userService.findUserById(userId);
        if (!user) {
          throw new Error('User not found');
        }
        if (!itinerary.members.some(member => member.id === user.id) && itinerary.owner.id !== user.id && !user.memberItineraries?.some(memberItinerary => memberItinerary.id === itinerary.id)) {
            itinerary.members.push(user);
            user.memberItineraries.push(itinerary);
            
            await this.updateItinerary(itinerary);
            await this.userService.updateUser(user);

          } else {
            return {success: false ,message:"The user is already a member or is an owner." }
          }
        return {success: true,message:"Member added successfully to the itinerary" }
    }


}
 