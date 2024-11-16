import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { RegisterComponent } from './modules/auth/register/register.component';
import { ToastrModule } from 'ngx-toastr';
import { EmailVerificationComponent } from './modules/auth//email.verification/email.verification.component';
import { HomeComponent } from './home/home.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { SearchBoxComponent } from './home/search-box/search-box.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    EmailVerificationComponent,
    HomeComponent,
    SearchBoxComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    MatChipsModule,
    MatIconModule,
    BrowserModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    
    ToastrModule.forRoot({
      timeOut: 4500,  // Duration the toast will remain visible
      positionClass: 'toast-top-right',  // Position on the screen
      preventDuplicates: false,  // Prevent multiple toasts of the same message
    })
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
