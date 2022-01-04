import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Role } from 'src/app/models/role';
import { RoleService } from 'src/app/services/roleService/role.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {MessageService} from 'primeng/api';
import { Table } from 'primeng/table'
@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css'],
  providers: [MessageService]
})
export class RoleComponent implements OnInit {
  filterTerm;
  @ViewChild('dt') dt: Table ;
  roles: Role[] = []
  selectedRole: Role
  
  closeResult: string;
  display: boolean=false;
  constructor(private roleService : RoleService ,  private modalService: BsModalService,private modaleService: NgbModal,private messageService: MessageService) {
   
   }
   

  ngOnInit(): void {
    
    this.collectAllRoles()
    this.roles
    
  }
  
  showDialog(role : Role) {
    this.selectedRole = role
    this.display = true;
}
  collectAllRoles() {
    this.roleService.getAllRoles()
      .subscribe({
        next: (roles) => {
          this.roles = roles
          console.log(this.roles)
        }
      })
  }

 
 
  updateRole(updateForm: HTMLFormElement){
    let nom = (<HTMLInputElement>updateForm.elements.namedItem('nom')).value
    let values ={
      nom
    }
   return  this.roleService.updateRole(this.selectedRole.idRole,values)
      .subscribe({
        next: (value) => { 
          this.display=false
          this.collectAllRoles()
          this.messageService.add({key: 'myKey3', severity:'warn', summary: 'Confirmation', detail: 'Role modifié avec succeé'});
        } 
      })
  }

  saveRole(roleForm : HTMLFormElement){
    let role=(<HTMLInputElement>roleForm.elements.namedItem('role')).value
   
    return this.roleService.saveRole({nom : role})
    .subscribe({
      next: result=>{
        console.log(result)
        roleForm.reset()
        this.collectAllRoles()
        this.messageService.add({key: 'myKey1', severity:'success', summary: 'Confirmation', detail: 'Role ajouté avec succeé'});
      },
      error :(error : HttpErrorResponse)=>{
       if(error.message.includes('auth Failed')){

       }
        
      }
      
    })
   

  }

  deleteRole(id) {
    this.roleService.deleteRole(id)
      .subscribe({
        next: (value) => {
          this.messageService.add({key: 'myKey2', severity:'info', summary: 'Confirmation', detail: 'Role supprimé avec succeé'});
        
          this.collectAllRoles()
         

        },
        
      })
  }

  open(content, id) {  
    this.modaleService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {  
      this.closeResult = `Closed with: ${result}`;  
      if (result === 'yes') {  
        this.deleteRole(id);  
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
