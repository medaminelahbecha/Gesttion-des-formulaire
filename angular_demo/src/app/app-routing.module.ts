import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EtapeComponent } from './components/etape/etape.component';
import { FormulaireComponent } from './components/formulaire/formulaire.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RoleComponent } from './components/role/role.component';
import { TransitionComponent } from './components/transition/transition.component';
import { UsersComponent } from './components/users/users.component';


const routes: Routes = [
  {path :'login',component: LoginComponent},
  {path :'home',component: HomeComponent},
  {path :'register',component: RegisterComponent},
  {path :'role',component: RoleComponent},
  {path :'etape',component: EtapeComponent},
  {path :'header',component: HeaderComponent},
  {path :'transition',component: TransitionComponent},
  {path :'formulaire',component: FormulaireComponent},
  {path :'users',component: UsersComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
