import { Component, Input, OnInit, Output } from '@angular/core';
import { CartaoConsumoService } from 'src/cartao-consumo.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { iConsumo } from '../iConsumo';
import { NumberFormatStyle } from '@angular/common';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { iMov } from '../iMov';
import { login, loginC, senha, senhaC } from '../app-routing.module';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent implements OnInit {
  consumo: any;
  consumId: any;
  login = login;
  loginC = loginC;
  senha = senha;
  senhaC = senhaC;
  isAdmin: any;

  constructor(
    private CartaoConsumoService: CartaoConsumoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.CartaoConsumoService.isAdmin);
    this.CartaoConsumoService.token = this.generateToken();
  }

  close() {
    window.close();
  }

  async obterConsulByNr(consumId: any) {
    this.CartaoConsumoService.obterConsuByNr(consumId).then((consum) => {
      this.consumo = consum;
      console.log(consum);
      if (this.consumo !== null) {
        this.goToUser(consumId);
      } else {
        window.alert('Cartão consumo não encontrado!');
      }
    });
  }

  goToUser(consumId: any) {
    console.log(this.router.url);
    this.router.navigate(['/user/' + consumId]);
  }

  goToAdmin(login: any, senha: any) {
    if (login == this.login && senha == this.senha) {
      localStorage.setItem('admin', '1');
      this.CartaoConsumoService.isAdmin = localStorage.getItem('admin');
      console.log(this.CartaoConsumoService.isAdmin);
      this.router.navigate(['/admin']);
    } else if (login == this.loginC && senha == this.senhaC) {
      localStorage.setItem('admin', '3');
      this.CartaoConsumoService.isAdmin = localStorage.getItem('admin');
      this.router.navigate(['/admin']);
    } else {
      localStorage.setItem('admin', '2');
      this.isAdmin = localStorage.getItem('admin');
      alert('Credenciais Incorretas!');
    }
  }

  generateToken() {
    return Math.floor(Math.random() * (100000 + 1));
  }
}
