import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators'
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private _loginObservable : BehaviorSubject<Object>;
  userLoginUrl ="http://localhost:8085/user/authenticate"
  userSingupUrl ="http://localhost:8085/user/register"
  getAllUsersUrl ="http://localhost:8085/user/getAll"
  deleteUrl ="http://localhost:8085/user/delete"
  userRoleUrl ="http://localhost:8085/user/addRole"
  updateUrl ="http://localhost:8085/user/update"
  isSuperAdminUrl ="http://localhost:8085/user/getRole"
  constructor(private httpClient:HttpClient) {
    this._loginObservable= new  BehaviorSubject({}) ; 
  }

  
  public get loginObservable(){
    return this._loginObservable
  }

private saveTokenToLOcalStorage(token : string){
  localStorage.setItem('token', "Bearer "+token)
}

logout(){
  localStorage.removeItem('token')
  this._loginObservable.next({})
}

isLoggedIn(){
  if(this.getToken() !=''){
    return true ;
  }
  return false ;
}

signup(user ){
  return this.httpClient.post(this.userSingupUrl,user)
  .pipe(
    map(result=>{
     return <{message : string}>result
    })
  )
}

login(caredentials : {username :string , password : string}){
  return this.httpClient.post<loginResponce>(this.userLoginUrl,caredentials)
  .pipe(
    map((result :loginResponce)=>{
      this.saveTokenToLOcalStorage(result.token)
      localStorage.setItem('username',caredentials.username)
      this._loginObservable.next({});
      return result
    })
  )
}
getToken(): any{
  return localStorage.getItem('token') ?? "";
  }

  getAllUsers(){
    return this.httpClient.get(this.getAllUsersUrl)
    .pipe(
      map(result=>{
       return <User[]> result
      })
    )
  }
  isSuperAdmin() {
    let username = localStorage.getItem('username') ?? "";
    return this.httpClient.get(`${this.isSuperAdminUrl}/${username}`).pipe(
      map(result=>{
        return <boolean>result 
      
      })
    )
    
  }

  deleteUser(id: any) {
    return this.httpClient.delete(`${this.deleteUrl}/${id}`)
  }

  addRoleUser(id,user) {
    return this.httpClient.put(`${this.userRoleUrl}/${id}`,user)
  }
  updateUser(id,user) {
    return this.httpClient.put(`${this.updateUrl}/${id}`,user)
  }

  
}


interface loginResponce{
  token : string,
  message : string
}






