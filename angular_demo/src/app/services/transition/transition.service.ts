import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Transition } from 'src/app/models/transition';
import { UserServiceService } from '../userService/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class TransitionService {

  addTransitionUrl="http://localhost:8085/transition/add"
  getAllTransitionUrl="http://localhost:8085/transition/getAll"
  deleteUrl="http://localhost:8085/transition/delete"
  updateUrl="http://localhost:8085/transition/update"

  constructor(private httpClient:HttpClient , private userService : UserServiceService) { }
  

  getAllTransition(){
    return this.httpClient.get(this.getAllTransitionUrl)
    .pipe(
      map(result=>{
       return <Transition[]> result
      })
    )
  }
  saveTransition(transition){
    
     return this.httpClient.post(this.addTransitionUrl,transition )
     .pipe(map((result )=>{
       return result ;
     }))
   }

   deleteTransition(id: any) {
    return this.httpClient.delete(`${this.deleteUrl}/${id}`)
  }

  updateTransition(id,transition) {
    return this.httpClient.put(`${this.updateUrl}/${id}`,transition)
  }

}
