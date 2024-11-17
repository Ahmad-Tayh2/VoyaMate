import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  toastr = inject(ToastrService);
  isVisible = false;

  handleRecover(form: NgForm) {
    this.route.params.subscribe((params) => {
      this.authService
        .resetPassword(params['token'], form.value.password)
        .subscribe({
          next: () => {
            this.router.navigate(['/login']);
            this.toastr.success('Password reset successfully');
          },
          error: (error) => {
            this.toastr.error('Something went wrong please try again');
          },
        });
    });
  }
}
