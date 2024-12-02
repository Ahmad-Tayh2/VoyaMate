import { Component, inject, OnInit } from '@angular/core';
import { ItineraryService } from 'src/app/core/services/itinerary/itinerary.service';
import { Itinerary } from 'src/app/models/Itinerary/Itinerary.model';
import { PagingConfig } from 'src/app/interfaces/paginator';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  itinerariesService = inject(ItineraryService)
  travelCards : Itinerary[] = []
  
 
  title = 'ngx-paging-sample';
  page : number = 1
  
  itemsPerPage: number = 10;
  totalPages : number[] = [];
  


  itineraries : Itinerary[] = []
  ngOnInit(): void {
    for(let i = 1 ; i <= 10;i++){
      this.totalPages[i] = i;
    }
   
   this.fetchItineraries();
  }

  
  onPageChange(event: number): void {
    this.page = event
  
    this.fetchItineraries(); // Fetch itineraries for the current page
  }
  fetchItineraries(){
    try{
      this.itinerariesService.fetchItineraries(this.page).subscribe((response)  =>{
        console.log(response.data)
        this.itineraries = response.data
      })
    }catch(e){
    console.log(e)
    } 
  }
  
  onNavClick(v : string){}
}
