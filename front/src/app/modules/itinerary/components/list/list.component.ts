// list.component.ts
import { Component, DoCheck, inject } from '@angular/core';
import { IniteraryService } from 'src/app/core/services/initerary/initerary.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements DoCheck {
  itinerary = inject(IniteraryService);
  places = this.itinerary.getPlaces();
  pendingPlace = this.itinerary.getPendingPlace();
  time: string = '';

  ngDoCheck() {
    this.pendingPlace = this.itinerary.getPendingPlace(); // Check for updates
  }

  confirmPlace() {
    if (this.time) {
      this.itinerary.confirmPlace(this.time);
      this.time = '';
      this.places = this.itinerary.getPlaces(); // Refresh list
    }
  }
}
