import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Formulaire } from 'src/app/models/formulaire';
import { EtapeService } from 'src/app/services/etapeService/etape.service';
import { FormulaireService } from 'src/app/services/formulaire/formulaire.service';
import { TransitionService } from 'src/app/services/transition/transition.service';
import {MessageService} from 'primeng/api';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css'],
  providers: [MessageService]
})
export class FormulaireComponent implements OnInit {
  filterTerm;
  selectedForm: Formulaire
  
  etapes: any[] = []
  formulaires: any[] = []
  
  etapeSuivante: Formulaire[];
  transitions
  display: boolean;
  closeResult: string;
  constructor(private etapeService : EtapeService, private formulaireService : FormulaireService ,private modaleService: NgbModal ,private modalService: BsModalService, private transitionService : TransitionService ,private messageService: MessageService,) { }

  
  ngOnInit(): void {
    this.collectAllEtapes()
    this.collectAllFormulaire()
    this.collectAlltransition()
    console.log(this.collectAllFormulaire())
    console.log(this.formulaires)
  }

  showDialog(form : Formulaire) {
    this.selectedForm = form
    this.display = true;
}
  collectAllEtapes() {
    this.etapeService.getAllEtape()
      .subscribe({
        next: (etapes) => {
          this.etapes = etapes
          
          
        }
      })
  }


  collectAllFormulaire() {
    this.formulaireService.getAllFormulaire()
      .subscribe({
        next: (formulaires) => {
          this.formulaires = formulaires
          console.log(this.formulaires)
        }
      })
  }
  collectAlltransition() {
    this.transitionService.getAllTransition()
      .subscribe({
        next: (transitions) => {
          this.transitions = transitions
          console.log(this.transitions)
        }
      })
  }

  


  saveFormulaire(form : HTMLFormElement){
    let nom=(<HTMLInputElement>form.elements.namedItem('nom')).value
    let prenom=(<HTMLInputElement>form.elements.namedItem('prenom')).value
    let cin=(<HTMLInputElement>form.elements.namedItem('cin')).value
    let email=(<HTMLInputElement>form.elements.namedItem('email')).value
    let creerPar=(<HTMLInputElement>form.elements.namedItem('creerPar')).value
    let etape=(<HTMLInputElement>form.elements.namedItem('etape')).value

    // etape =JSON.stringify(etape)
 let values  =
 {
   nom , prenom,cin,email,creerPar,etape :{idEtape :etape}
 }
 
 
 console.log(values)
    return this.formulaireService.saveFormulaire(values)
    .subscribe({
      next: result=>{
        console.log(result)
        form.reset()
        this.messageService.add({key: 'myKey1', severity:'success', summary: 'Confirmation', detail: 'Formulaire ajouté avec succeé'});
        this.collectAllFormulaire()
        
      },
    })

  }


  deleteFormulaire(id) {
    this.formulaireService.deleteFormulaire(id)
      .subscribe({
        next: (value) => {
          this.messageService.add({key: 'myKey3', severity:'info', summary: 'Confirmation', detail: 'Formulaire supprimé avec succeé'});
          this.collectAllFormulaire()
        },   
      })
  }
  open(content, id) {  
    this.modaleService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {  
      this.closeResult = `Closed with: ${result}`;  
      if (result === 'yes') {  
        this.deleteFormulaire(id);  
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

  updateForm(formTemplate: HTMLFormElement){
    let nom=(<HTMLInputElement>formTemplate.elements.namedItem('nom')).value
    let prenom=(<HTMLInputElement>formTemplate.elements.namedItem('prenom')).value
    let cin=(<HTMLInputElement>formTemplate.elements.namedItem('cin')).value
    let email=(<HTMLInputElement>formTemplate.elements.namedItem('email')).value
    let modifierPar=(<HTMLInputElement>formTemplate.elements.namedItem('modifierPar')).value
    let etape=(<HTMLInputElement>formTemplate.elements.namedItem('etape')).value

    // etape =JSON.stringify(etape)
 let values  =
 {
   nom , prenom,cin,email,modifierPar,etape :{idEtape : etape}
 }
 
   return  this.formulaireService.updateFormulaire(this.selectedForm.idFormulaire,values)
      .subscribe({
        next: (value) => { 
          this.display=false;
          this.messageService.add({key: 'myKey2', severity:'warn', summary: 'Confirmation', detail: 'Formulaire modifié avec succeé'});
          this.collectAllFormulaire()
        } 
      })
  }

}
