import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { APP_API, tokenName } from 'src/app/config/app-api.config';
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
  resetPassword(token: string, password: string) {
    return this.http.post(APP_API.resetPassword + token, password);
  }

  getToken(): string | null {
    return localStorage.getItem(tokenName);
  }

  setToken(token: string) {
    localStorage.setItem(tokenName, token);
  }
}
