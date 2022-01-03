import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/userService/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  form : HTMLFormElement 
  returnUrl: string 
  constructor(private userService : UserServiceService,
   
    private router : Router) { }

  ngOnInit(): void {
  }



  login(event : Event){
    event.preventDefault();
    this.form=<HTMLFormElement>event.target
    this.readFormValues();
  }

  navigateToHomePage(){
    let url = this.returnUrl ? this.returnUrl  : '/home';
    this.router.navigateByUrl(url)

  }
  

  readFormValues(){
    let username = (<HTMLFormElement>this.form.elements.namedItem('username')).value
    let password = (<HTMLFormElement>this.form.elements.namedItem('password')).value;
    let creadentials = {
      username , password
    }
 
    console.log(creadentials);
   
    this.userService.login(creadentials)
    .subscribe({
      next :(result )=>{
        console.log(result);
        this.navigateToHomePage();
      },
      
    })
    
    }

}


