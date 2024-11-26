import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  travelCards = [
    {
      imageUrl: 'https://via.placeholder.com/300x200',
      category: 'Solo Travel',
      author: 'Adam Smith',
      title: 'Exploring Venice',
      description: 'A beautiful journey through the canals of Venice.',
    },
    {
      imageUrl: 'https://via.placeholder.com/300x200',
      category: 'Adventure',
      author: 'Jane Doe',
      title: 'Hiking the Alps',
      description: 'An adventurous trek through the stunning Alpine trails.',
    },
    {
      imageUrl: 'https://via.placeholder.com/300x200',
      category: 'Beach Vibes',
      author: 'John Doe',
      title: 'Maldives Paradise',
      description: 'Relax and unwind on the beautiful beaches of Maldives.',
    },
    {
      imageUrl: 'https://via.placeholder.com/300x200',
      category: 'Cultural Exploration',
      author: 'Sara Lee',
      title: 'Exploring Ancient Egypt',
      description: 'Discover the wonders of the Pyramids and ancient Egyptian history.',
    },
    {
      imageUrl: 'https://via.placeholder.com/300x200',
      category: 'Road Trip',
      author: 'Tom Green',
      title: 'Pacific Coast Highway',
      description: 'An unforgettable road trip along California’s scenic coastline.',
    },
    {
      imageUrl: 'https://via.placeholder.com/300x200',
      category: 'City Life',
      author: 'Emily White',
      title: 'New York City Adventure',
      description: 'Experience the hustle and bustle of one of the world\'s most iconic cities.',
    },

  ];
  
  onNavClick(v : string){}
}
