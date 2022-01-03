import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserServiceService } from '../userService/user-service.service';
import { map } from 'rxjs/operators';
import { Role } from 'src/app/models/role';
@Injectable({
  providedIn: 'root'
})
export class RoleService {
  addRoleUrl="http://localhost:8085/role/add"
  getAllRoleUrl="http://localhost:8085/role/getAll"
  deleteUrl="http://localhost:8085/role/delete"
  updateUrl="http://localhost:8085/role/update"
  constructor(private httpClient:HttpClient , private userService : UserServiceService ) { }


  

  getAllRoles(){
    return this.httpClient.get(this.getAllRoleUrl)
    .pipe(
      map(result=>{
       return <Role[]> result
      })
    )
  }
  saveRole(data : {nom : string}){
    
     return this.httpClient.post(this.addRoleUrl,data )
     .pipe(map((result )=>{
       return result ;
     }))
   }

   deleteRole(id: any) {
    
    return this.httpClient.delete(`${this.deleteUrl}/${id}`)


  }

  updateRole(id,data) {
   
    return this.httpClient.put(`${this.updateUrl}/${id}`,data)



  }
}
