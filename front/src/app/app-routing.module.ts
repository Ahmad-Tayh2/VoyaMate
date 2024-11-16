import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './modules/auth/register/register.component';
import { AppComponent } from './app.component';
import { EmailVerificationComponent } from './modules/auth/email.verification/email.verification.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path:'',component:HomeComponent
  },
  {
    path:'email-verification',component:EmailVerificationComponent
  },
  {
    path: 'register',component:RegisterComponent,
  },
  {
    path:'login',component:RegisterComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
