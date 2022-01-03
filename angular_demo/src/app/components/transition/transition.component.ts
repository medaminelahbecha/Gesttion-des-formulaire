import { transition } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { filter } from 'rxjs';
import { Etape } from 'src/app/models/etape';
import { Transition } from 'src/app/models/transition';
import { EtapeService } from 'src/app/services/etapeService/etape.service';
import { RoleService } from 'src/app/services/roleService/role.service';
import { TransitionService } from 'src/app/services/transition/transition.service';

@Component({
  selector: 'app-transition',
  templateUrl: './transition.component.html',
  styleUrls: ['./transition.component.css']
})
export class TransitionComponent implements OnInit {
  success: string;
  error: undefined;
  filterTerm;
  constructor(private etapeService : EtapeService, private roleService : RoleService , private transitionService : TransitionService,private modalService: BsModalService) { }
  selectedTransition: Transition
  modelRef: BsModalRef;
  etapes: any[] = []
  etapeSuivante: any[] = []
  roles: any[] = []
  transitions: any[] = []
  openModal(formTemplate, transition) {
    this.selectedTransition = transition
    this.modelRef = this.modalService.show(formTemplate)
    
  }
  
  ngOnInit(): void {
    this.collectAllEtapes()
    this.collectAllRoles()
    this.collectAllTransition()
   
    
  
  
  }

  collectAllRoles() {
    this.roleService.getAllRoles()
      .subscribe({
        next: (roles) => {
          this.roles = roles
         
        }
      })
  }
  collectAllEtapes() {
    this.etapeService.getAllEtape()
      .subscribe({
        next: (etapes) => {
          this.etapes = etapes
          
        }
      })
  }
  
  collectAllTransition() {
    this.transitionService.getAllTransition() .subscribe({
      next: (transition) => {
        this.transitions = transition 
      }
    })
      
  }
  

  saveTransition(transitionForm : HTMLFormElement){
    let etapeActuelle=(<HTMLInputElement>transitionForm.elements.namedItem('etapeActuelle')).value
    let etapeSuivante=(<HTMLInputElement>transitionForm.elements.namedItem('etapeSuivante')).value
    let rolePk=(<HTMLInputElement>transitionForm.elements.namedItem('role')).value
  
 let values   =
 {
  etapeActuelle : {idEtape : etapeActuelle} , etapeSuivante: {idEtape: etapeSuivante} , rolePK : {idRole: rolePk}
   
 }
 console.log(values)
 return this.transitionService.saveTransition(values)
 .subscribe({
   next: result=>{
     console.log(result)
     transitionForm.reset()
     this.success="transition ajouter avec succée"
     this.error=undefined
     this.collectAllTransition()
     
   },
 })
}


  
     
deleteTransition(id) {
  this.transitionService.deleteTransition(id)
    .subscribe({
      next: (value) => {
        this.collectAllTransition()
      },   
    })
} 
     
updateTransition(updateForm: HTMLFormElement){
  let etapeActuelle=(<HTMLInputElement>updateForm.elements.namedItem('etapeActuelle')).value
    let etapeSuivante=(<HTMLInputElement>updateForm.elements.namedItem('etapeSuivante')).value
    let rolePk=(<HTMLInputElement>updateForm.elements.namedItem('role')).value
    let values   =
 {
  etapeActuelle : {idEtape : etapeActuelle} , etapeSuivante: {idEtape: etapeSuivante} , rolePK : {idRole: rolePk}
   
 }
 return  this.transitionService.updateTransition(this.selectedTransition.idTransition,values)
    .subscribe({
      next: (value) => { 
        this.modelRef.hide();
        this.success="transition modifier avec succée"
        this.error=undefined
        this.collectAllTransition()
      } 
    })
}  
     

  

}
