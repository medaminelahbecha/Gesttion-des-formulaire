import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { User } from 'src/app/models/user';
import { RoleService } from 'src/app/services/roleService/role.service';
import { UserServiceService } from 'src/app/services/userService/user-service.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {MessageService} from 'primeng/api';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [MessageService]
})
export class UsersComponent implements OnInit {
  users: any[] = []
  roles: any[] = []
  selectedUser : User
 
  
  closeResult: string;
  display: boolean;
  display1: boolean;
  constructor(private userService :UserServiceService, private modalService: BsModalService , private roleService : RoleService, private modaleService: NgbModal,private messageService: MessageService) { }

  ngOnInit(): void {

    this.collectAllUsers()
    this.collectAllRole()
  }
  showDialog(user : User) {
    this.selectedUser = user
    this.display = true;
}
  showDialog1(user : User) {
    this.selectedUser = user
    this.display1 = true;
}

  


  collectAllUsers() {
    this.userService.getAllUsers()
      .subscribe({
        next: (users) => {
          this.users = users
          console.log(this.users)
        }
      })
  }
  collectAllRole() {
    this.roleService.getAllRoles()
      .subscribe({
        next: (roles) => {
          this.roles = roles
          console.log(this.users)
        }
      })
  }

  deleteUser(id) {
    this.userService.deleteUser(id)
      .subscribe({
        next: (value) => {
          this.messageService.add({key: 'myKey1', severity:'info', summary: 'Confirmation', detail: 'user supprimé avec succeé'});
          this.collectAllUsers()
        },   
      })
  } 

  affecterRole(roleForm: HTMLFormElement){
    
      let roleFK=(<HTMLInputElement>roleForm.elements.namedItem('roleFK')).value
      let values   =
   {
    roleFK : {idRole: roleFK}
     
   }
   return  this.userService.addRoleUser(this.selectedUser.id,values)
      .subscribe({
        next: (value) => { 
         this.display=false
          this.messageService.add({key: 'myKey3', severity:'success', summary: 'Confirmation', detail: 'Role ajouté avec succeé'});
          this.collectAllUsers()
          

        } 
      })
  }  
  updateUser(updateForm: HTMLFormElement){
    
      let username=(<HTMLInputElement>updateForm.elements.namedItem('username')).value
      let values   =
   {username}
   return  this.userService.updateUser(this.selectedUser.id,values)
      .subscribe({
        next: (value) => { 
          this.display1=false
          this.messageService.add({key: 'myKey2', severity:'warn', summary: 'Confirmation', detail: 'User modifié avec succeé'});
          this.collectAllUsers()
        } 
      })
  } 
  
  open(content, id) {  
    this.modaleService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {  
      this.closeResult = `Closed with: ${result}`;  
      if (result === 'yes') {  
        this.deleteUser(id);  
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
