import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserItinerariesComponent } from './user-itineraries.component';

describe('UserItinerariesComponent', () => {
  let component: UserItinerariesComponent;
  let fixture: ComponentFixture<UserItinerariesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserItinerariesComponent]
    });
    fixture = TestBed.createComponent(UserItinerariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
