import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CountrycodeService } from 'src/app/core/services/countryservice/countrycode.service';
import { CountryCode } from 'src/app/models/coutryCode/countryCode';
import { Register } from 'src/app/models/register/register.model';

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
  countrycodeService = inject(CountrycodeService);
  router = inject(Router);
  authService = inject(AuthService)
  loading : boolean = false;
  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(6)]],
      countryCode: ['+1', Validators.required],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      acceptTerms : [false,[Validators.requiredTrue]]
    });
  }
  ngOnInit() {

    try{
      this.countrycodeService.getAllCodes().subscribe((data)=>{
        data.filter((value)=> value.idd && value.idd.root)
        .map((value)=> this.countryCodes.push(new CountryCode(value.name.common,value.idd.root + value.idd.suffixes.at(0))))
      })


      console.log(this.countryCodes)
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
          this.router.navigate(['register'])


        },
      (error) => {
        this.toastr.error(error.message,'Error')

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
    return this.registerForm.get(name)?.value.length < 8  && this.registerForm.get(name)?.touched;
  }


}
