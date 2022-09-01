import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { AdmComponent } from './adm/adm.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'cadastro', component: CadastroComponent },
  { path: 'adm', component: AdmComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
