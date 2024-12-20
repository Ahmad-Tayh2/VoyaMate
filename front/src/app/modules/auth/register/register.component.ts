import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CountrycodeService } from 'src/app/core/services/countryservice/countrycode.service';
import { CountryCode } from 'src/app/models/coutryCode/countryCode';
import { Register } from 'src/app/models/register/register.model';
import { codes } from 'src/app/shared/countryCodes.static';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  registerForm: FormGroup;
  countryCodes : CountryCode[] = [];
  selectedCountry? : CountryCode;

  toastr = inject(ToastrService)
  router = inject(Router);
  authService = inject(AuthService)
  loading : boolean = false;
  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(6)]],
      countryCode: ['+1', Validators.required],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8),Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)]],
      acceptTerms : [false,[Validators.requiredTrue]]
    });
  }
  ngOnInit() {

    try{
      codes.map((v)=>this.countryCodes.push(new CountryCode(v.name,v.code)))
     
    }catch(e){
       console.log(e)
    }
    
  }
  onSubmit() {
    if (this.registerForm.valid) {

      try{     
        
        this.loading = true;
        const form = this.registerForm.value;
        console.log(form.email)
        this.authService.register(new Register(form.email,form.password,form.username,form.phone)).subscribe(
          (result) =>{
          this.toastr.success(`Email verification is sent to ${this.registerForm.value.email}.`,'Success')
          this.router.navigate(['/login'])


        },
      (error) => {
        console.log(error)
        this.toastr.error(error.error.message,'Error')

      })
      this.loading = false;

        
      }catch(e){

        console.log(e)
      }

    } else {
      this.registerForm.markAllAsTouched(); // Show all validation errors
    }
  }

  checkInputState(name : string):boolean | undefined{
    return !this.registerForm.get(name)?.valid  && this.registerForm.get(name)?.touched;
  }
  checkPassword(){

    return !(!this.registerForm.get('password')?.valid && this.registerForm.get('password')?.touched)
  }


}
