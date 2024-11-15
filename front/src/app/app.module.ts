import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { RegisterComponent } from './modules/auth/register/register.component';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 3000,  // Duration the toast will remain visible
      positionClass: 'toast-top-right',  // Position on the screen
      preventDuplicates: true,  // Prevent multiple toasts of the same message
    })
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
