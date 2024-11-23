import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { MyAccountComponent } from './my-account/my-account.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UserItinerariesComponent } from './user-itineraries/user-itineraries.component';


@NgModule({
  declarations: [
    MyAccountComponent,
    SidebarComponent,
    UserItinerariesComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule
  ]
})
export class UserModule { }
