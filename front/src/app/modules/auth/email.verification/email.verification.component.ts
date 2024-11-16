import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-email.verification',
  templateUrl: './email.verification.component.html',
  styleUrls: ['./email.verification.component.css']
})
export class EmailVerificationComponent implements OnInit {

  route = inject(ActivatedRoute);
  router = inject(Router);
  authService = inject(AuthService);
  message : string = "";
  ngOnInit(): void {
    const id = this.route.snapshot.queryParamMap.get('id');
    const token = this.route.snapshot.queryParamMap.get('token');
    if(id != undefined && token != undefined && ! isNaN(Number(id))){
       this.authService.verifyEmail(id,token).subscribe((response) => {
         if(response.status === 200){
          this.message = "Email is successfully verified"
         }
         else{
          this.message = "Faield to verify email"
         }
       })

    }
    this.message = "Invalid Request"
  }

  onProceedToLogin(): void {
    this.router.navigate(['/login']); // Navigate to the login page
  }
}
