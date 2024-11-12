import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountrycodeService {
  private apiUrl = 'https://restcountries.com/v3.1/all';

  constructor(private http : HttpClient) {
    this.http = http;
   }
   
   getAllCodes():Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl)
   }
}
