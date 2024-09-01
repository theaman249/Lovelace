export class User {

    public name: string;
    public surname: string;
    public email:string;
    public role:string;
    public phoneNumber:string;
    public birthday:string;
    public message:string;
    
  
    constructor(name: string, surname: string,email:string,role:string,phone_number:string,birthday:string,msg?:string) {
      this.name = name;
      this.surname = surname;
      this.email = email;
      this.role = role;
      this.phoneNumber = phone_number;
      this.birthday = birthday;
      this.message = msg || 'none';
    }


}