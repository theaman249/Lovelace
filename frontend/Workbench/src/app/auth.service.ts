import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private readonly http:HttpClient) { }


  public loginUser(email:string,password:string){ 
    const url = 'http://localhost:3000/auth/login';
    const body = {
      email:email,
      password: password
    }

    this.http.post(url,body).subscribe((res:any) => {
      return res;
    })
  }


}
