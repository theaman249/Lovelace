import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private readonly http:HttpClient) { }


  public loginUser(email:string,password:string):Promise<User>{ 
    const url = 'http://localhost:3000/auth/login';
    
    const body = {
      email:email,
      password: password
    }

    return this.http.post<any>(url, body).toPromise()
    .then(res => {
      return new User(
        res.name,
        res.surname,
        res.email,
        res.role,
        res.phone_number,
        res.birthday,
        res.message
      );
    })
    .catch(error => {
      console.error('Error during login:', error);
      throw error; // Re-throw the error after logging or handling it
    });

  }

  public signupUser(name:string,surname:string,email:string,password:string,role:string,birthday:string):Promise<string>
  {
    const url = 'http://localhost:3000/auth/register';
    
    const body = {
      name:email,
      surname: surname,
      email:email,
      password:password,
      role:role,
      birthday:birthday
    }

    return this.http.post<any>(url, body).toPromise()
    .then(res => {
      return res.message;
    })
    .catch(error => {
      console.error('Error during login:', error);
      throw error;
    });
  }


}
