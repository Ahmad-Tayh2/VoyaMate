import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItineraryOverviewComponent } from './itinerary-overview.component';

describe('ItineraryOverviewComponent', () => {
  let component: ItineraryOverviewComponent;
  let fixture: ComponentFixture<ItineraryOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItineraryOverviewComponent]
    });
    fixture = TestBed.createComponent(ItineraryOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
