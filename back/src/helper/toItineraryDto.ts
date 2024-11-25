import { ItineraryResponseDto } from "src/modules/itinerary/dtos/itinerary.response.dto";
import { Itinerary } from "src/modules/itinerary/itinerary.entity";

export function transformItineraryToDto(itinerary: Itinerary):ItineraryResponseDto {
    return {
        id: itinerary.id,
        name: itinerary.name,
        description: itinerary.description,
        budget: itinerary.budget,
        ownerId: itinerary.owner?.id,
        membersIds: itinerary.members?.map(m => m.id) || [],
    };
}

