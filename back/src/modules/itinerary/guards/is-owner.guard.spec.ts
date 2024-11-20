import { IsOwnerGuard } from '../../modules/itinerary/gards/is-owner.guard';

describe('IsOwnerGuard', () => {
  it('should be defined', () => {
    expect(new IsOwnerGuard()).toBeDefined();
  });
});
