import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css'],
})
export class RecoverPasswordComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);
  authService = inject(AuthService);
  isVisible = false;

  handleRecover(form: NgForm) {
    this.route.params.subscribe((params) => {
      this.authService
        .resetPassword(params['token'], form.value.password)
        .subscribe({
          next: () => {
            this.router.navigate(['/login']);
          },
          error: (error) => {
            console.log(error);
          },
        });
    });
  }
}
