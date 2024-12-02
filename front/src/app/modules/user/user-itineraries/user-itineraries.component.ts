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
        mates:['assets/images(4).png','assets/images(4).png','assets/images(4).png','assets/images(4).png']}
    },
    {
      title: 'Paris 5-Day Tour',
      user: 'Judy',
      days: 5,
      image: 'assets/france.png',
      overview: {
        image: 'assets/paris.png',
        mates:['assets/images(4).png','assets/images(4).png','assets/images(4).png','assets/images(4).png']}
    },
    {
      title: 'Tainan 3-Day Tour: Eat Eat Eat',
      user: 'David',
      days: 3,
      image: 'assets/eat.png',
      overview: {
        image: 'assets/paris.png',
        mates:['assets/images(4).png','assets/images(4).png','assets/images(4).png','assets/images(4).png']}
    },
    {
      title: 'Japan Tour: Attack on Titan Pilgrimage',
      user: 'Tom',
      days: 5,
      image: 'assets/japan.png',
      overview: {
        image: 'assets/paris.png',
        mates:['assets/images(4).png','assets/images(4).png','assets/images(4).png','assets/images(4).png']}
    },
  ];
  selectedCard: any;
  selectedItinerary: any = null;
  selectCard(itinerary: any) {
    if (this.selectedCard === itinerary) {
      this.selectedCard = null; // Deselect if the card is already selected
    } else {
      this.selectedCard = itinerary;
      this.selectedItinerary = itinerary; // Select the card
    }
  }
}
