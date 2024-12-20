import { Component, inject, NgModule, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { ItineraryService } from 'src/app/core/services/itinerary/itinerary.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css'],
})
export class SearchBoxComponent implements OnInit{
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  } 

  itineraryService = inject(ItineraryService)
  query : string = "";
  suggestions : any[] = [];
  selectedDate : any;
  status : string = 'upcoming' ;

  onSearch(){
  
    this.itineraryService.updateName(this.query)
    this.itineraryService.updateStatus(this.status)

    this.itineraryService.fetchItinerariesbyData()
  }
  onSelectSuggestion(s : any){}
  
}
