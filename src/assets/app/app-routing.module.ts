import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule }    from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { UserLoginComponent } from './user-login/user-login.component';
import { AppComponent } from './app.component';
import { AdminConsumoComponent } from './admin-consumo/admin-consumo.component';
import { UserMovComponent } from './user-mov/user-mov.component';

const routes: Routes = [
{path:"", redirectTo:"login", pathMatch:"full"},
{path:"login", component:UserLoginComponent},
{path:"user/:nro", component:UserMovComponent},
{path:"admin", component:AdminConsumoComponent},

];

export const login = "admin";
export const senha = "zip-super";
export const loginC = "caixa";
export const senhaC = "zip-super"

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
