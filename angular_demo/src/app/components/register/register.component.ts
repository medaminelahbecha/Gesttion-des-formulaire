import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserServiceService } from 'src/app/services/userService/user-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService :UserServiceService ,private router :Router) { }

  ngOnInit(): void {
  }


  navigateToLoginPage(){
    this.router.navigate(['login'])
  }

  readValueFromForm(form :HTMLFormElement){
    let username =(<HTMLInputElement>form.elements.namedItem('username')).value
   
    let password =(<HTMLInputElement>form.elements.namedItem('password')).value
    
    

    let user  ={
      username,
      password,
     
    };
    return user;
  }
  signup(event : Event){
    event.preventDefault();
    let form =<HTMLFormElement>event.target;
    let user=this.readValueFromForm(form);
    this.createUser(user,form)
    

    
  }

  createUser(user ,form:HTMLFormElement){
    this.userService.signup(user).subscribe(
      {
        next:(result :{message:string})=>{
          console.log(result);
          
          form.reset();
          this.navigateToLoginPage();
        },
        
      }
    )
  }

}
