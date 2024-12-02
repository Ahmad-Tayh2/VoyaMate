import { Component , Input } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { startOfDay } from 'date-fns';
import { endOfDay } from 'date-fns';
@Component({
  selector: 'app-itinerary-overview',
  templateUrl: './itinerary-overview.component.html',
  styleUrls: ['./itinerary-overview.component.css']
})
export class ItineraryOverviewComponent {
@Input() itinerary: any;
view: string = 'month'; // View type: 'month', 'week', 'day'
viewDate: Date = new Date(); // Current date in the calendar

  // Events to highlight trip days
  events: CalendarEvent[] = [
    {
      start: startOfDay(new Date(2024, 11, 5)), // Dec 5th, 2024
      end: endOfDay(new Date(2024, 11, 7)),   // Dec 7th, 2024
      title: 'Trip to Paris',
      color: { primary: '#ff0000', secondary: '#ffcccc' }, // Red color for the event
      allDay: true,
    },
    {
      start: startOfDay(new Date(2024, 11, 15)), // Dec 15th, 2024
      end: endOfDay(new Date(2024, 11, 15)),   // Same day event
      title: 'Day in Amsterdam',
      color: { primary: '#00ff00', secondary: '#ccffcc' }, // Green color for this event
      allDay: true,
    },]
}
