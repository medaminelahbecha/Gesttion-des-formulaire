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
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-transition',
  templateUrl: './transition.component.html',
  styleUrls: ['./transition.component.css'],
  providers: [MessageService]
})
export class TransitionComponent implements OnInit {
  display: boolean;
  
  
  constructor(private etapeService : EtapeService, private roleService : RoleService , private transitionService : TransitionService,private modalService: BsModalService ,private modaleService: NgbModal ,private messageService: MessageService) { }
  selectedTransition: Transition

  etapes: any[] = []
  etapeSuivante: any[] = []
  roles: any[] = []
  transitions: any[] = []
  closeResult: string;
  
  
  ngOnInit(): void {
    this.collectAllEtapes()
    this.collectAllRoles()
    this.collectAllTransition()
   
    
  
  
  }

  showDialog(trans : Transition) {
    this.selectedTransition = trans
    this.display = true;
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
     this.messageService.add({key: 'myKey3', severity:'success', summary: 'Confirmation', detail: 'Transition ajouté avec succeé'});
     this.collectAllTransition()
     
   },
 })
}


  
     
deleteTransition(id) {
  this.transitionService.deleteTransition(id)
    .subscribe({
      next: (value) => {
        this.messageService.add({key: 'myKey1', severity:'info', summary: 'Confirmation', detail: 'Transition supprimé avec succeé'});
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
        this.display=false
        this.messageService.add({key: 'myKey2', severity:'warn', summary: 'Confirmation', detail: 'Transition modifié avec succeé'});
        this.collectAllTransition()
      } 
    })
}  
     
open(content, id) {  
  this.modaleService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {  
    this.closeResult = `Closed with: ${result}`;  
    if (result === 'yes') {  
      this.deleteTransition(id);  
    }  
  }, (reason) => {  
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;  
  });  
}  

private getDismissReason(reason: any): string {  
  if (reason === ModalDismissReasons.ESC) {  
    return 'by pressing ESC';  
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {  
    return 'by clicking on a backdrop';  
  } else {  
    return `with: ${reason}`;  
  }  
}  
  

}
