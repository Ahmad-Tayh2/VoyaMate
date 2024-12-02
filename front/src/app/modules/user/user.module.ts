import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { MyAccountComponent } from './my-account/my-account.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UserItinerariesComponent } from './user-itineraries/user-itineraries.component';
import { ItineraryOverviewComponent } from './itinerary-overview/itinerary-overview.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

@NgModule({
  declarations: [
    MyAccountComponent,
    SidebarComponent,
    UserItinerariesComponent,
    ItineraryOverviewComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ]
})
export class UserModule { }
