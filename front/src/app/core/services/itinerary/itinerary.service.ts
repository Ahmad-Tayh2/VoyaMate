import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_API } from 'src/app/config/app-api.config';
import { Itinerary } from 'src/app/models/Itinerary/Itinerary.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ItineraryService {

  authService = inject(AuthService)
  headers = {
    'Authorization':`Bearer ${this.authService.getToken()}`
  }
  http = inject(HttpClient);
  

  constructor() {
  
   }
  fetchItineraries(page : Number){
    console.log(this.authService.getToken())
    return this.http.get<any>(`${APP_API.getItineraries}?page=${page}`,{headers:this.headers})
  }

}
