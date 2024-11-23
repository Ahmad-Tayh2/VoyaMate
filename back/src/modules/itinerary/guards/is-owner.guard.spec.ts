import { ItineraryService } from '../itinerary.service';
import { IsOwnerGuard } from './is-owner.guard';

describe('IsOwnerGuard', () => {
  it('should be defined', () => {
    const itineraryService = {} as ItineraryService;
    expect(new IsOwnerGuard(itineraryService)).toBeDefined();
  });
});
