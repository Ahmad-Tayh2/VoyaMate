import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryCode } from 'src/app/core/models/countryCode';
import { CountrycodeService } from 'src/app/services/countryservice/countrycode.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  registerForm: FormGroup;
  countryCodes : CountryCode[] = [];
  selectedCountry? : CountryCode;

  constructor(private fb: FormBuilder,private countrycodeService : CountrycodeService) {
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
      console.log(this.registerForm.value);
    } else {
      this.registerForm.markAllAsTouched(); // Show all validation errors
    }
  }

  checkInputState(name : string):boolean | undefined{
    return this.registerForm.get(name)?.value.length < 8  && this.registerForm.get(name)?.touched;
  }
}
