import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { User } from 'src/app/models/user';
import { RoleService } from 'src/app/services/roleService/role.service';
import { UserServiceService } from 'src/app/services/userService/user-service.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any[] = []
  roles: any[] = []
  selectedUser : User
  modelRef: BsModalRef;
  success: string;
  error: undefined;
  filterTerm;
  constructor(private userService :UserServiceService, private modalService: BsModalService , private roleService : RoleService) { }

  ngOnInit(): void {

    this.collectAllUsers()
    this.collectAllRole()
  }

  openModal(formTemplate, user) {
    this.selectedUser = user
    this.modelRef = this.modalService.show(formTemplate)
    console.log(this.selectedUser.username)
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
          this.modelRef.hide();
          this.success="role  affecter avec succée"
          this.error=undefined
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
          this.modelRef.hide();
          this.success="User "+ username +  " updated avec succée"
          this.error=undefined
          this.collectAllUsers()
        } 
      })
  }  

}
