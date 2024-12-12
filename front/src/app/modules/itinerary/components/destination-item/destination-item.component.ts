import { Component, inject, Input } from '@angular/core';
import { IniteraryService } from 'src/app/core/services/initerary/initerary.service';
import { Place } from 'src/app/models/itinerary/itinerary.model';

@Component({
  selector: 'app-destination-item',
  templateUrl: './destination-item.component.html',
  styleUrls: ['./destination-item.component.css'],
})
export class DestinationItemComponent {
  @Input() place!: Place;
  itinerary = inject(IniteraryService);
  constructor() {
    console.log(this.place);
  }
  deletePlace(place: Place) {
    this.itinerary.deletePlace(place);
  }
}
