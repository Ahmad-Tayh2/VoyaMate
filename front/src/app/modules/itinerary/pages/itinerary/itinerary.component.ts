import { Component } from '@angular/core';
import { IniteraryService } from 'src/app/core/services/initerary/initerary.service';

@Component({
  selector: 'app-itinerary',
  templateUrl: './itinerary.component.html',
  styleUrls: ['./itinerary.component.css'],
})
export class ItineraryComponent {
  places = [
    { name: 'Tunis', lat: 36.8065, lon: 10.1815 },
    { name: 'Sousse', lat: 35.8256, lon: 10.63699 },
    { name: 'Monastir', lat: 35.7643, lon: 10.8113 },
    { name: 'Mahdia', lat: 35.5022, lon: 11.0457 },
    { name: 'Gabès', lat: 33.8815, lon: 10.0982 },
  ];
  constructor(private itinerary: IniteraryService) {
    this.itinerary.setPlaces(this.places);
  }
}
