import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent {
  authService = inject(AuthService);
  toastr = inject(ToastrService);
  handleRecover(form: NgForm) {
    this.authService.SendResetLink(form.value.email).subscribe({
      next: () => {
        this.toastr.success('Reset Link Sent to Your Email');
      },
      error: () => {
        this.toastr.error('Invalid Email');
      },
    });
  }
}
