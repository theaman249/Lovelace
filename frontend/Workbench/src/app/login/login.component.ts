import { Component, Inject, Injectable } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CookieModule, CookieService } from 'ngx-cookie';
import { COOKIE_OPTIONS } from 'ngx-cookie';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    CookieModule,
    HttpClientModule,
  ],
  providers:[
    CookieService,
    {
      provide: COOKIE_OPTIONS,
      useValue: { /* your options here */ }
    },
    AuthService
    
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})


export class LoginComponent {

  constructor(
    @Inject(COOKIE_OPTIONS) private readonly cookie:CookieService,
    private readonly authService:AuthService,
    private readonly snackBar: MatSnackBar
  ){
    console.log('Help');
  }

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });


  login(){
    const formValues = this.loginForm.value; // Extract form values
    
    const email = formValues.email;
    const password = formValues.password;

    if(email && password){
      console.log(this.authService.loginUser(email,password));
    }
    else{
      this.snackBar.open("Error Fetching Email and Password")
      setTimeout(() => {
      this.snackBar.dismiss();
      }, 5000)
    }    
  }
  

}

