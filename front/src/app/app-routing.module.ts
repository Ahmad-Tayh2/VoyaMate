import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './modules/auth/register/register.component';
import { AppComponent } from './app.component';

const routes: Routes = [
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
