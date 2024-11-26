import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ItineraryService } from '../itinerary.service';

//This guard checks if the user who is making the request is the owner of the itinerary
@Injectable()
export class IsOwnerGuard implements CanActivate {
  constructor(private readonly itineraryService: ItineraryService) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    const request=context.switchToHttp().getRequest();
    const userId=request.user.userId;
    const itineraryId=request.params.id;

    const itinerary=await this.itineraryService.findItineraryById(itineraryId);
    if(!itinerary || itinerary.ownerId!==userId){
      return false;
    }
    return true;
  }
}
