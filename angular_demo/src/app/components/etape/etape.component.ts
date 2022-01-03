import { Component, OnInit } from '@angular/core';
import { Etape } from 'src/app/models/etape';
import { EtapeService } from 'src/app/services/etapeService/etape.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-etape',
  templateUrl: './etape.component.html',
  styleUrls: ['./etape.component.css']
})
export class EtapeComponent implements OnInit {
  selectedEtape: Etape
  modelRef: BsModalRef;
  etapes: any[] = []
  success: string;
  error: undefined;
  filterTerm;
  constructor(private etapeService : EtapeService,  private modalService: BsModalService) { }

  ngOnInit(): void {

    this.collectAllEtapes()
  }

  openModal(formTemplate, etape) {
    this.selectedEtape = etape
    this.modelRef = this.modalService.show(formTemplate)
    console.log(this.selectedEtape.idEtape)
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
          this.modelRef.hide();
          this.success="etape  modifier avec succée"
          this.error=undefined
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
        this.success="etape  ajouter avec succée"
        this.error=undefined
        this.etapes.push(result)
        
      },
    })

  }


  deleteEtape(id) {
    this.etapeService.deleteEtape(id)
      .subscribe({
        next: (value) => {
          this.collectAllEtapes()
        },   
      })
  }


}
