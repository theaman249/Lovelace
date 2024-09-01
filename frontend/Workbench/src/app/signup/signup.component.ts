import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    FormsModule
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
    role: new FormControl(''),
  })

  async signup(){
    const formValues = this.signupForm.value;

    const name = formValues.name;
    const surname = formValues.surname;
    const email = formValues.email;
    const password = formValues.password;
    let role = '';

    if(formValues.role === 'Admin')
      role = 'admin';
    else
      role = 'employee';

    console.log(formValues,'+',role);
  }

}
