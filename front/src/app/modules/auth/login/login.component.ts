import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  authService = inject(AuthService);
  route = inject(Router);
  toastr = inject(ToastrService);
  isVisible = false;
  handleSubmit(form: NgForm) {
    this.authService.handleLogin(form.value).subscribe({
      next: (data: any) => {
        this.route.navigate(['/']);
        this.authService.setToken(data.token);
      },
      error: () => {
        this.toastr.error('Invalid Credentials Please Try Again');
      },
    });
  }
}
