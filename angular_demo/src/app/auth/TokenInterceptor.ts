import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { UserServiceService } from '../services/userService/user-service.service';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: UserServiceService) {}

  
 
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   let token =localStorage.getItem('token')
   
   if(token){
    const cloned = request.clone({
        headers:request.headers.set("Authorization", token)
    })
    return next.handle(cloned);
   }
   else{
    return next.handle(request);
   }
   
   
    
  }
}