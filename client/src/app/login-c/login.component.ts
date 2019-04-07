import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import {AuthService} from '../general-services/auth.service';
import { Router, ActivatedRoute, Params } from "@angular/router"
import { Route } from '@angular/compiler/src/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
 
  
  //Form controls

  email = new FormControl("", [
    Validators.required,
  ]);
  password = new FormControl("", [
    Validators.required,
  ]);
 

  constructor ( 
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router

  ) {
    
  }

  ngOnInit() {
   
    this.checkForLocalStorage();

    this.loginForm = this.formBuilder.group(
      {
        email: this.email,
        password: this.password
      }
     
    );
  }

  // if user is logged in redirect to dashboard page
  checkForLocalStorage(){
    if(localStorage.getItem('token')) {
      this.router.navigate(["/dashboard"]);
    }
  }

  login() {
    this.authService.login(this.loginForm.value).subscribe(
        data =>{
          this.router.navigate(["/dashboard"]);
        },
        err => {
            console.log('err',err);
        }
    )
    
  }



 
}
