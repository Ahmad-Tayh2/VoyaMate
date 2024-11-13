import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { APP_API } from 'src/app/config/app-api.config';
import { Login } from 'src/app/models/auth/login.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);

  constructor() {}
  handleLogin(data: Login) {
    return this.http.post(APP_API.login, data);
  }
  SendResetLink(email: string) {
    return this.http.post(APP_API.recoverPassword, email);
  }
}
