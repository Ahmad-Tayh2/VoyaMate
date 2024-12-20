import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { RegisterComponent } from './modules/auth/register/register.component';
import { EmailVerificationComponent } from './modules/auth/email.verification/email.verification.component';
import { HomeComponent } from './modules/home/home.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { SearchBoxComponent } from './modules/home/search-box/search-box.component';
import { TravelCardComponent } from './modules/home/travel-card/travel-card.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

@NgModule({
  declarations: [
    AppComponent,
    TravelCardComponent,
    RegisterComponent,
    EmailVerificationComponent,
    HomeComponent,
    SearchBoxComponent
  ],
  imports: [
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),

    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      timeOut: 4500,  // Duration the toast will remain visible
      positionClass: 'toast-top-right',  // Position on the screen
      preventDuplicates: false,  // Prevent multiple toasts of the same message
    }),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatChipsModule,
    MatIconModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
