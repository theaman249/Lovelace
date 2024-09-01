import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers:[
    AuthService
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  signupForm = new FormGroup({
    name:new FormControl(''),
    surname: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    birthday: new FormControl(''),
    role: new FormControl(''),
    number: new FormControl(''),
  })

  constructor(
    private readonly authService:AuthService,
    private readonly router:Router,
    private readonly snackBar: MatSnackBar
  ){}

  async signup(){
    const formValues = this.signupForm.value;

    const name = formValues.name;
    const surname = formValues.surname;
    const email = formValues.email;
    const password = formValues.password;
    const birthday = formValues.birthday;
    const phoneNumber = formValues.number;

    let role = '';

    if(formValues.role === 'Admin')
      role = 'admin';
    else
      role = 'employee';

    if (name && password && email && surname && birthday && phoneNumber ) {
      let result: string; 

      try {
        result = await this.authService.signupUser(name,surname,email,password,role,birthday,phoneNumber);
        console.log(result);
        if (result === 'registration successful') {
          console.log('Success');
          
          //this.router.navigate(['login']);

        } 
        else {
          this.snackBar.open('Login failed: ' + result);
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
