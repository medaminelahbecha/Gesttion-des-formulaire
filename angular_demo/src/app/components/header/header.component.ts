import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/userService/user-service.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false ;
  isSuperAdmin ;
  
  constructor(private userService : UserServiceService , private router:Router) { }

  ngOnInit(): void {

    this.userService.loginObservable.subscribe({
      next :()=>{
       let token = this.userService.getToken();
       if(token!= ''){
         this.chekAdmin()
         this.isLoggedIn=true;
       }else{
         this.isLoggedIn=false;
       }
       console.log(this.isLoggedIn)

      }
    })

   
      
  }

  chekAdmin(){
    this.isSuperAdmin= this.userService.isSuperAdmin()
      
   }


  logout(){
    this.userService.logout();
    this.router.navigate(['login'])
  }


}
