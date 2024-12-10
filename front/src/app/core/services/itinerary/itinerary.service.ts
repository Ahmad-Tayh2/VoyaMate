import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_API } from 'src/app/config/app-api.config';
import { Itinerary } from 'src/app/models/Itinerary/Itinerary.model';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItineraryService {

  authService = inject(AuthService)
  headers = {
    'Authorization':`Bearer ${this.authService.getToken()}`
  }
  private dataSubject = new BehaviorSubject<any>(null); // Observable stream
  public data$ = this.dataSubject.asObservable(); // Expose as Observable for subscribers
  
  private pageSubject = new BehaviorSubject<number>(0); // Observable stream
  public page$ = this.pageSubject.asObservable(); // Expose as Observable for subscribers


  
  updateItineraries(response : any){
    this.dataSubject.next(response)
  }
  private nameSubject = new BehaviorSubject<string>(""); // Observable stream
  public name$ = this.nameSubject.asObservable(); // Expose as Observable for subscribers


  
  updatename(query : string){
    this.nameSubject.next(query)
  }
  updatePage(page : number){
    this.pageSubject.next(page)
  }
  http = inject(HttpClient);
  

  constructor() {
  
   }

  fetchItinerariesbyPage(){
  
     this.http.get<any>(`${APP_API.getItineraries}?page=${this.pageSubject.getValue()}&limit=6&name=${this.nameSubject.getValue()}`,{headers:this.headers}).subscribe((v)=>{
        this.updateItineraries(v)
     })
     window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  }
  fetchItinerariesbyData(){
 
    this.http.get<any>(`${APP_API.getItineraries}?page=${this.pageSubject.getValue()}&limit=6&name=${this.nameSubject.getValue()}`,{headers:this.headers}).subscribe((v)=>{
       this.updateItineraries(v)
    })
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
 }

}
