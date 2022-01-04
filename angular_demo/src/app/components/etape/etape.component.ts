import { Component, OnInit } from '@angular/core';
import { Etape } from 'src/app/models/etape';
import { EtapeService } from 'src/app/services/etapeService/etape.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-etape',
  templateUrl: './etape.component.html',
  styleUrls: ['./etape.component.css'],
  providers: [MessageService]
})
export class EtapeComponent implements OnInit {
  selectedEtape: Etape
  etapes: any[] = []
  
  filterTerm;
  closeResult: string;
  display: boolean;
  constructor(private etapeService : EtapeService,  private modalService: BsModalService ,private modaleService: NgbModal ,private messageService: MessageService) { }

  ngOnInit(): void {

    this.collectAllEtapes()
  }

  showDialog(etape : Etape) {
    this.selectedEtape = etape
    this.display = true;
}
  
  updateEtape(updateForm: HTMLFormElement){
    let etapeFini = (<HTMLInputElement>updateForm.elements.namedItem('etapeFini')).value
    let nom = (<HTMLInputElement>updateForm.elements.namedItem('name')).value

    let values={
      etapeFini , nom
    }
   return  this.etapeService.updateEtape(this.selectedEtape.idEtape,values)
      .subscribe({
        next: (value) => { 
          this.display=false
          this.messageService.add({key: 'myKey3', severity:'warn', summary: 'Confirmation', detail: 'Etape modifié avec succeé'});
          this.collectAllEtapes()
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


  saveEtape(etapeForm : HTMLFormElement){
    let nom=(<HTMLInputElement>etapeForm.elements.namedItem('name')).value
    let etapeFini=(<HTMLInputElement>etapeForm.elements.namedItem('etapeFini')).value

 let values  ={
   nom , etapeFini
 }
    return this.etapeService.saveEtape(values)
    .subscribe({
      next: result=>{
        console.log(result)
        etapeForm.reset()
        this.messageService.add({key: 'myKey1', severity:'success', summary: 'Confirmation', detail: 'etape ajouter avec succeé'});
        this.etapes.push(result)
        
      },
    })

  }


  deleteEtape(id) {
    this.etapeService.deleteEtape(id)
      .subscribe({
        next: (value) => {
          this.messageService.add({key: 'myKey2', severity:'info', summary: 'Confirmation', detail: 'Etape suppeimé avec succeé'});
          this.collectAllEtapes()
        },   
      })
  }

  open(content, id) {  
    this.modaleService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {  
      this.closeResult = `Closed with: ${result}`;  
      if (result === 'yes') {  
        this.deleteEtape(id);  
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
