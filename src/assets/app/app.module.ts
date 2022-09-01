import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { UserMovComponent } from './user-mov/user-mov.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { AdminConsumoComponent } from './admin-consumo/admin-consumo.component';
import jsPDF from "jspdf";
import { CadastroComponent } from './cadastro/cadastro.component';


@NgModule({
  declarations: [
    AppComponent,
    UserMovComponent,
    UserLoginComponent,
    AdminConsumoComponent,
    CadastroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [UserLoginComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
