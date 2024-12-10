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
    const token = this.route.snapshot.queryParamMap.get('token');
    if(token != undefined ){
      console.log(token)
       this.authService.verifyEmail(token).subscribe((response) => {
        console.log(response)
         if(response.success){
        
        this.message = "User email confirmed successfully"
         }
         else{
        this.message = "Failed to verify email"
         }
       })
        
    }
    this.message = "Invalid Request"
  }

  onProceedToLogin(): void {
    this.router.navigate(['/login']); // Navigate to the login page
  }
}
