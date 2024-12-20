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

  private statusSubject = new BehaviorSubject<string>(""); // Observable stream
  public status$ = this.statusSubject.asObservable(); // Expose as Observable for subscribers

  private dateSubject = new BehaviorSubject<string>(""); // Observable stream
  public date$ = this.dateSubject.asObservable(); // Expose as Observable for subscribers

  updateName(query : string){
    this.nameSubject.next(query)
  }
  updateStatus(status:string){
    this.statusSubject.next(status)

  }
  updatePage(page : number){
    this.pageSubject.next(page)
  }
  http = inject(HttpClient);
  

  constructor() {
  
   }

   getItineraryById(itId : number): Observable<Itinerary>{
    return this.http.get<any>(`${APP_API.getItineraries}/${itId}`,{headers:this.headers});
   }
   getItineraryOwner(userId : number): Observable<any>{
    return  this.http.get<any>(`${APP_API.user}/${userId}`,{headers:this.headers});
   }

  fetchItinerariesbyPage(){
  
     this.http.get<any>(`${APP_API.getItineraries}?page=${this.pageSubject.getValue()}&limit=6&name=${this.nameSubject.getValue()}&status=${this.statusSubject.getValue() != "" ? this.statusSubject.getValue() : "upcoming"}`,{headers:this.headers}).subscribe((v)=>{
        this.updateItineraries(v)
     })
     window.scrollTo({
      top: window.parent.document.body.scrollHeight,
      behavior: 'smooth'
    });
  }
  fetchItinerariesbyData(){

    this.http.get<any>(`${APP_API.getItineraries}?page=${this.pageSubject.getValue()}&limit=6&name=${this.nameSubject.getValue()}&status=${this.statusSubject.getValue() != "" ? this.statusSubject.getValue() : "upcoming"} `,{headers:this.headers}).subscribe((v)=>{
      
       this.updateItineraries(v)
    })
    window.scrollTo({
      top: window.parent.document.body.scrollHeight,
      behavior: 'smooth'
    });
 }

}
