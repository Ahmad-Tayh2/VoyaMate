import { Component , Input, SimpleChanges } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';

@Component({
  selector: 'app-itinerary-overview',
  templateUrl: './itinerary-overview.component.html',
  styleUrls: ['./itinerary-overview.component.css']
})
export class ItineraryOverviewComponent {
@Input() itinerary: any;
viewDate: Date = new Date(); // Default to current date
events: CalendarEvent[] = [];

ngOnChanges(changes: SimpleChanges): void {
  if (this.itinerary && this.itinerary.overview && this.itinerary.overview.calendar) {
    this.events = this.itinerary.overview.calendar;

    // If there are events, set viewDate to the month of the first event
    if (this.events.length > 0) {
      const firstEvent = this.events[0];
      this.viewDate = new Date(firstEvent.start.getFullYear(), firstEvent.start.getMonth(), 1);
    }
  }
}
}