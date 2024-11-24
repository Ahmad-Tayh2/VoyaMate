import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyAccountComponent } from './my-account/my-account.component';
import { UserItinerariesComponent } from './user-itineraries/user-itineraries.component';

const routes: Routes = [
  {
    path: 'my-account', 
    component: MyAccountComponent, 
    children: [
      { path: '', redirectTo: 'user-itineraries', pathMatch: 'full' },
      { path: 'user-itineraries', component: UserItinerariesComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
