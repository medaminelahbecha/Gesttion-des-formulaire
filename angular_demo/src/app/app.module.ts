import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { RoleComponent } from './components/role/role.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { EtapeComponent } from './components/etape/etape.component';
import { HeaderComponent } from './components/header/header.component';
import { TransitionComponent } from './components/transition/transition.component';
import { FormulaireComponent } from './components/formulaire/formulaire.component';
import { UsersComponent } from './components/users/users.component';
import { TokenInterceptor } from './auth/TokenInterceptor';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    RoleComponent,
    EtapeComponent,
    HeaderComponent,
    TransitionComponent,
    FormulaireComponent,
    UsersComponent,
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ModalModule.forRoot() ,
    Ng2SearchPipeModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    TableModule,
    BrowserAnimationsModule,
    DialogModule,
    InputTextModule
    
    
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
