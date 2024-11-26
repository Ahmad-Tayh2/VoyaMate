import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './modules/auth/register/register.component';
import { AppComponent } from './app.component';
import { EmailVerificationComponent } from './modules/auth/email.verification/email.verification.component';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/auth/login/login.component';

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
    path:'login',component:LoginComponent
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path:'auth/confirm',
    component:EmailVerificationComponent

  },
  {
    path: 'user',
    loadChildren: () =>
      import('./modules/user/user.module').then((m) => m.UserModule), 
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

