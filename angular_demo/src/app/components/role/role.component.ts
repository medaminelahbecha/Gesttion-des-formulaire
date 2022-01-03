import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Role } from 'src/app/models/role';
import { RoleService } from 'src/app/services/roleService/role.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css'],
})
export class RoleComponent implements OnInit {
  filterTerm;
  success
  error
  roles: any[] = []
  selectedRole: Role
  modelRef: BsModalRef;
  constructor(private roleService : RoleService ,  private modalService: BsModalService) {
   
   }

  ngOnInit(): void {
    this.collectAllRoles()
    this.roles
    
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

  openModal(formTemplate, role) {
    this.selectedRole = role
    this.modelRef = this.modalService.show(formTemplate)
    console.log(this.selectedRole.idRole)
  }
 
  updateRole(updateForm: HTMLFormElement){
    let nom = (<HTMLInputElement>updateForm.elements.namedItem('nom')).value
    let values ={
      nom
    }
   return  this.roleService.updateRole(this.selectedRole.idRole,values)
      .subscribe({
        next: (value) => { 
          this.modelRef.hide();
          this.collectAllRoles()
          this.success="role "+ nom +  " updated avec succée"
        this.error=undefined
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
        this.roles.push(result)
        this.success="role "+ role + " ajouter avec succée"
        this.error=undefined
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
          this.collectAllRoles()
         

        },
        
      })
  }

}
