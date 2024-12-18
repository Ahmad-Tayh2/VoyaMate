import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_API, tokenName } from 'src/app/config/app-api.config';
import { Login } from 'src/app/models/auth/login.model';
import { Register } from 'src/app/models/register/register.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http = inject(HttpClient);

  constructor() {}
 
  register(data : Register):Observable<any>{
      return this.http.post(APP_API.register,data)

  }

  verifyEmail( token : string):Observable<any>{
    return this.http.get(`${APP_API.confirm}?token=${token}`)
  }

  cacheToken(token : string){
    localStorage.setItem('token',token)}

  handleLogin(data: Login) {
    return this.http.post(APP_API.login, data);
  }
  SendResetLink(email: string) {
    return this.http.post(APP_API.recoverPassword, email);
  }
  resetPassword(token: string, password: string) {
    return this.http.post(APP_API.resetPassword + token, password);
  }

  getToken(): string | null {
    return localStorage.getItem(tokenName);
  }

  setToken(token: string) {
    localStorage.setItem(tokenName, token);
  }

  logout() {
    localStorage.removeItem(tokenName);
  }
}
