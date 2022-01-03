import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserServiceService } from '../userService/user-service.service';
import { map } from 'rxjs/operators';
import { Etape } from 'src/app/models/etape';

@Injectable({
  providedIn: 'root'
})
export class EtapeService {

  addEtapeUrl="http://localhost:8085/etape/add"
  getAllEtapeUrl="http://localhost:8085/etape/getAll"
  deleteUrl="http://localhost:8085/etape/delete"
  updateUrl="http://localhost:8085/etape/update"
  getOneEtapeUrl="http://localhost:8085/etape/getOne"

  constructor(private httpClient:HttpClient , private userService : UserServiceService ) { }

  


  getAllEtape(){
    return this.httpClient.get(this.getAllEtapeUrl)
    .pipe(
      map(result=>{
       return <Etape[]> result
      })
    )
  }
  getOneEtape(id){
    return this.httpClient.get(`${this.getOneEtapeUrl}/${id}`)
    .pipe(
      map(result=>{
       return  result
      })
    )
  }
  saveEtape(etape){
    
     return this.httpClient.post(this.addEtapeUrl,etape )
     .pipe(map((result )=>{
       return result ;
     }))
   }

   deleteEtape(id: any) {
    return this.httpClient.delete(`${this.deleteUrl}/${id}`)
  }


  updateEtape(id,etape) {
    return this.httpClient.put(`${this.updateUrl}/${id}`,etape)
  }

}
