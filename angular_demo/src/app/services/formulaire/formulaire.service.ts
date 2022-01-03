import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Formulaire } from 'src/app/models/formulaire';
import { UserServiceService } from '../userService/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class FormulaireService {

  addFormulaireUrl="http://localhost:8085/form/add"
  getAllFormulaireUrl="http://localhost:8085/form/getAll"
  deleteUrl="http://localhost:8085/form/delete"
  updateUrl="http://localhost:8085/form/update"

  constructor(private httpClient:HttpClient , private userService : UserServiceService) { }

 

  getAllFormulaire(){
    return this.httpClient.get(this.getAllFormulaireUrl)
    .pipe(
      map(result=>{
       return <Formulaire[]> result
      })
    )
  }
  saveFormulaire(formulaire){
    
     return this.httpClient.post(this.addFormulaireUrl,formulaire )
     .pipe(map((result )=>{
       return result ;
     }))
   }


   deleteFormulaire(id: any) {
    return this.httpClient.delete(`${this.deleteUrl}/${id}`)
  }

  updateFormulaire(id,form) {
    return this.httpClient.put(`${this.updateUrl}/${id}`,form)
  }

}
