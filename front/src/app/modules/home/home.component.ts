import { Component, inject, OnInit } from '@angular/core';
import { ItineraryService } from 'src/app/core/services/itinerary/itinerary.service';
import { Itinerary } from 'src/app/models/Itinerary/Itinerary.model';
import { PagingConfig } from 'src/app/interfaces/paginator';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  itinerariesService = inject(ItineraryService)
  router = inject(Router)
  travelCards : Itinerary[] = []
  
 
  title = 'ngx-paging-sample';
  page : number = 1
  
  itemsPerPage: number = 10;
  totalPages : number[] = [];
  
  


  itineraries : Itinerary[] = []
  ngOnInit(): void {
    console.log("")
    for(let i = 1 ; i <= 10;i++){
      this.totalPages[i] = i;
    }
    this.itinerariesService.data$.subscribe((response)  =>{
      if(response != null && response != undefined){
        this.itineraries = response.data
        this.itineraries.forEach((it)=>it.imageUrl = "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D")

      }
    })
   this.fetchItineraries();
  }

  
  onPageChange(event: number): void {
    this.page = event
  
  
    this.fetchItineraries(); // Fetch itineraries for the current page
  }
  fetchItineraries(){
    try{
    this.itinerariesService.updatePage(this.page)  
    this.itinerariesService.fetchItinerariesbyPage()
    }catch(e){
    console.log(e)
    } 
  }
  
  onNavClick(v : string){
    switch (v){
      case 'My Account':
        this.router.navigate(['login'])
        return;
    }
  }
}
