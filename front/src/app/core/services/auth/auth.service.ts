import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_API } from 'src/app/config/app-api.config';
import { Register } from 'src/app/models/register/register.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http = inject(HttpClient);

  constructor() {}
 
  register(data : Register):Observable<any>{
    console.log(data)
      return this.http.post(APP_API.register,data)

  }

  verifyEmail(id : string , token : string):Observable<any>{
    return this.http.get(`${APP_API.confirm}?id=${id}&token=${token}`)
  }

  cacheToken(token : string){
    localStorage.setItem('token',token)
  }
}
