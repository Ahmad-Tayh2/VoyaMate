import { Component } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { startOfDay } from 'date-fns';
@Component({
  selector: 'app-user-itineraries',
  templateUrl: './user-itineraries.component.html',
  styleUrls: ['./user-itineraries.component.css']
})
export class UserItinerariesComponent {
  selectedFilter: string = 'Ongoing';
  filters: string[] = ['Ongoing', 'Completed', 'Upcoming'];
  itineraries = [
    {
      title: "Hualien-Taitung 3-Day Tour: Let's Run the Taroko Marathon!",
      user: 'Weiwei',
      days: 3,
      image: 'assets/marathon.png',
      overview: {
        image: 'assets/paris.png',
        mates:['assets/images(4).png','assets/images(4).png','assets/images(4).png','assets/images(4).png'],
        calendar: [
          {
            start: new Date(2024, 11, 5),
            end: new Date(2024, 11, 7),
            title: 'Hualien-Taitung',
            color: { primary: '#D8B9F6', secondary: '#D8B9F6' },
            allDay: true,
          }]}
    },
    {
      title: 'Paris 5-Day Tour',
      user: 'Judy',
      days: 5,
      image: 'assets/france.png',
      overview: {
        image: 'assets/paris.png',
        mates:['assets/images(4).png','assets/images(4).png','assets/images(4).png','assets/images(4).png'],
        calendar: [
          {
            start: new Date(2025, 2, 3),
            end: new Date(2025, 2, 7),
            title: 'Paris Tour',
            color: { primary: '#D8B9F6', secondary: '#D8B9F6' },
            allDay: true,
          }]}
    },
    {
      title: 'Tainan 3-Day Tour: Eat Eat Eat',
      user: 'David',
      days: 3,
      image: 'assets/eat.png',
      overview: {
        image: 'assets/paris.png',
        mates:['assets/images(4).png','assets/images(4).png','assets/images(4).png','assets/images(4).png'],
        calendar: [
          {
            start: new Date(2025, 1, 3),
            end: new Date(2025, 1, 5),
            title: 'Tainan  Tour',
            color: { primary: '#D8B9F6', secondary: '#D8B9F6' },
            allDay: true,
          }]}
    },
    {
      title: 'Japan Tour: Attack on Titan Pilgrimage',
      user: 'Tom',
      days: 5,
      image: 'assets/japan.png',
      overview: {
        image: 'assets/paris.png',
        mates:['assets/images(4).png','assets/images(4).png','assets/images(4).png','assets/images(4).png'],
        calendar: [
          {
            start: new Date(2025, 4, 13),
            end: new Date(2025, 4, 16),
            title: 'Japan Tour',
            color: { primary: '#D8B9F6', secondary: '#D8B9F6' },
            allDay: true,
          }]
      }
    },
  ];
  selectedCard: any;
  selectedItinerary: any = null;
  selectCard(itinerary: any) {
    if (this.selectedCard === itinerary) {
      this.selectedCard = null; 
    } else {
      this.selectedCard = itinerary;
      this.selectedItinerary = itinerary; 
    }
  }
}
