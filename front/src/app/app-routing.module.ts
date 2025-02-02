import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { EmailVerificationComponent } from './modules/auth/email.verification/email.verification.component';
import { HomeComponent } from './modules/home/home.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },

  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'auth/confirm',
    component: EmailVerificationComponent,
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./modules/user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'itinerary',
    loadChildren: () =>
      import('./modules/itinerary/itinerary.module').then(
        (m) => m.ItineraryModule
      ),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
