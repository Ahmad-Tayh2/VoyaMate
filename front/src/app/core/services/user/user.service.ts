import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { APP_API } from 'src/app/config/app-api.config';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  headers = {
    'Authorization':`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vaGFtZWRhbWluZXRsaWxpMDJAZ21haWwuY29tIiwic3ViIjoxLCJpYXQiOjE3MzMxNjY5MzAsImV4cCI6MTczMzE3MDUzMH0.psyYIk-ZVO1F34ssNakAvvlJiTK9QCbXasULXZRmAic`
  }
  http = inject(HttpClient);
  constructor() { }
}
