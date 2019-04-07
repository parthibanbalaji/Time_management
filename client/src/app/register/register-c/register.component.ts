import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import {RegisterService}  from "../services/register.service";



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  passmismatch: boolean = false;
  
  //Form controls
  userName = new FormControl("", [Validators.required]);
  role = new FormControl("", [Validators.required]);
  phone = new FormControl("", [Validators.required, Validators.minLength(10)]);
  firstName = new FormControl("", [Validators.required]);
  lastName = new FormControl("", [Validators.required]);
  email = new FormControl("", [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(100),
    Validators.pattern(
      "[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})"
    )
  ]);
  password = new FormControl("", [
    Validators.required,
    Validators.minLength(6),
    Validators.pattern(this.strongRegex)
  ]);
  confirmPassword = new FormControl("", [Validators.required]);

  constructor ( 
    private formBuilder: FormBuilder,
    private registerService: RegisterService

  ) {
    
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        userName: this.email,
        email: this.email,
        password: this.password,
        role: "user",
        phone: this.phone,
        firstName: this.firstName,
        lastName: this.lastName,
        confirmPassword: this.confirmPassword,
      },
      {
        validator: this.checkIfMatchingPasswords("password", "confirmPassword")
      }
    );
  }

  checkIfMatchingPasswords( passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        this.passmismatch = true;
        return passwordConfirmationInput.setErrors({ notEquivalent: true });
      } else {
        this.passmismatch = false;
        return passwordConfirmationInput.setErrors(null);
      }
    };
  }

  register() {
    console.log('at register');
      this.registerService.registerUser(this.registerForm.value).subscribe(
        data => {
          console.log('register successfully !!');
        },
        error => console.log("get user group error" , error)
      )
    
  }

 
}
