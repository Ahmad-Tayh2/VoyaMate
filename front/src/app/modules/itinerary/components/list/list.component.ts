import { Component, inject } from '@angular/core';
import { IniteraryService } from 'src/app/core/services/initerary/initerary.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  places: { name: string; lat: number; lon: number }[] = [];
  itinerary = inject(IniteraryService);
  constructor() {
    this.places = this.itinerary.getPlaces();
  }
}
