import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_API } from 'src/app/config/app-api.config';
import { Itinerary } from 'src/app/models/Itinerary/Itinerary.model';

@Injectable({
  providedIn: 'root'
})
export class ItineraryService {

  headers = {
    'Authorization':`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vaGFtZWRhbWluZXRsaWxpMDJAZ21haWwuY29tIiwic3ViIjoxLCJpYXQiOjE3MzMxNjY5MzAsImV4cCI6MTczMzE3MDUzMH0.psyYIk-ZVO1F34ssNakAvvlJiTK9QCbXasULXZRmAic`
  }
  http = inject(HttpClient);
  

  constructor() {
  
   }
  fetchItineraries(page : Number){
    return this.http.get<any>(`${APP_API.getItineraries}?page=${page}`,{headers:this.headers})
  }

}
