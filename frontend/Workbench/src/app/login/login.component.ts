import { Component, Inject, Injectable } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CookieModule, CookieService } from 'ngx-cookie';
import { COOKIE_OPTIONS } from 'ngx-cookie';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    CookieModule,
    HttpClientModule
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
    private readonly snackBar: MatSnackBar,
    private readonly router:Router,
  ){
    console.log('Help');
  }

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });


  async login() {
    const formValues = this.loginForm.value; // Extract form values
  
    const email = formValues.email;
    const password = formValues.password;
  
    if (email && password) {
      let result: User; // Correctly declare the variable using 'let'
  
      try {
        result = await this.authService.loginUser(email, password);
        
        if (result.message === 'login successful') {
          console.log('Success');
          
          this.router.navigate(['Home']);
          
        } else {
          this.snackBar.open('Login failed: ' + result.message);
          setTimeout(() => {
            this.snackBar.dismiss();
          }, 5000);
        }
      } catch (error) {
        console.error('Error during login:', error);
        this.snackBar.open('Error during login');
        setTimeout(() => {
          this.snackBar.dismiss();
        }, 5000);
      }
    } else {
      this.snackBar.open('Error Fetching Email and Password');
      setTimeout(() => {
        this.snackBar.dismiss();
      }, 5000);
    }
  }
  
  

}

