import { Component } from '@angular/core';
import { IniteraryService } from 'src/app/core/services/initerary/initerary.service';

@Component({
  selector: 'app-itinerary',
  templateUrl: './itinerary.component.html',
  styleUrls: ['./itinerary.component.css'],
})
export class ItineraryComponent {
  places = [];
  constructor() {
    // this.itinerary.setPlaces(this.places);
  }
}
