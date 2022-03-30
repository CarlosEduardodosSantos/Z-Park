import { Component, Input, OnInit } from '@angular/core';
import { CartaoConsumoService } from 'src/cartao-consumo.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { iConsumo } from '../iConsumo';
import { NumberFormatStyle } from '@angular/common';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { iMov } from '../iMov';
import { iMovXandao } from '../iMovXandao';
import { UserLoginComponent } from '../user-login/user-login.component';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-user-mov',
  templateUrl: './user-mov.component.html',
  styleUrls: ['./user-mov.component.scss'],
})
export class UserMovComponent implements OnInit {
  consumo: any;
  movimentacao: any;
  restaurante: any;
  consumId: any;
  shortdate: any;
  movPos: any;
  movNeg: any;
  saldoInicial: any;
  Id: any;
  isAdmin: any = localStorage.getItem('admin');
  index: any;

  constructor(
    private CartaoConsumoService: CartaoConsumoService,
    private login: UserLoginComponent,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.Id = this.route.snapshot.paramMap.get('nro');
  }
  ngOnInit() {
    this.CartaoConsumoService.isAdmin = localStorage.getItem('admin');
    console.log(this.CartaoConsumoService.isAdmin);
    this.obterConsulByNr();
  }

  catchIndex(i: any) {
    this.index = i;
    console.log(this.index);
  }

  consumoModel: iConsumo = new iConsumo();
  mov: iMovXandao = new iMovXandao();
  movE: iMov = new iMov();

  async obterConsulByNr() {
    await this.CartaoConsumoService.obterConsuByNr(this.Id).then((consum) => {
      this.consumo = consum;
      console.log(consum);
    });
    await this.CartaoConsumoService.obterMovByConsuId(
      this.consumo.cartaoConsumoId
    ).then((mov) => {
      this.movimentacao = mov;
      console.log(mov);
    });
    await this.CartaoConsumoService.obterResById(
      this.consumo.restauranteId
    ).then((res) => {
      this.restaurante = res;
    });
  }

  converterCurrency(valor: number) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
  }

  converterCurrencyMov(valor: number, tipo: any) {
    if (tipo == 1) {
      return (
        '+' +
        new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(valor)
      );
    } else {
      return (
        '-' +
        new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(valor)
      );
    }
  }

  converterShortDate(data: any) {
    let dataco = new Date(data).getUTCDate();
    let dia = new Date(data).getDate();
    let mes = new Date(data).getMonth() + 1;
    let ano = new Date(data).getFullYear();
    this.shortdate = mes + '/' + ano;
    console.log(this.shortdate);
  }

  converterLongDate(data: any) {
    let datamov = new Date(data).toLocaleDateString();
    let hora = new Date(data).toLocaleTimeString();

    return datamov + ' ' + hora;
  }

  voltarLogin() {
    this.router.navigate(['/admin/']);
  }
  Sair() {
    localStorage.clear();
    localStorage.removeItem('admin');
    location.href = '/';
  }

  printThisPage() {
    window.print();
  }

  async EditById(
    _guid: any,
    _numeroEdit: any,
    _descEdit: any,
    _valorEdit: any,
    _validadeEdit: any,
    _cpfEdit: any,
    _descontoEdit: any,
    _nomeEdit: any,
    _restauranteEdit: any,
    _saldoAtual: any
  ) {
    this.consumoModel = {
      cartaoConsumoId: _guid,
      numero: _numeroEdit,
      descricao: _descEdit,
      valor: _valorEdit,
      validade: _validadeEdit,
      Cpf: _cpfEdit,
      Desconto: _descontoEdit,
      Nome: _nomeEdit,
      restauranteId: _restauranteEdit,
      saldoAtual: _saldoAtual,
    };
    if (
      _numeroEdit !== '' &&
      _descEdit !== '' &&
      _valorEdit !== '' &&
      _validadeEdit !== ''
    ) {
      let consumo: any;
      await this.CartaoConsumoService.obterConsuByNr(_numeroEdit).then(
        (consum) => {
          consumo = consum;
        }
      );
      if (_numeroEdit !== consumo.numero) {
        this.CartaoConsumoService.updateConsu(this.consumoModel).then(() =>
          location.reload()
        );
      } else {
        window.alert('O cartão ja existe!');
      }
    } else {
      window.alert('Por favor insira todas as Informações!');
    }
  }

  getTxtInfoMov(_saldo: any, _tipoMov: any) {
    this.mov = {
      numeroCartao: this.consumo.numero,
      valor: _saldo,
      tipoMov: _tipoMov,
      restauranteId: environment.resId,
    };
    if (this.mov.valor !== '' && this.mov.tipoMov !== '') {
      if (this.mov.tipoMov === '1') {
        let soma = parseFloat(this.consumo.saldoAtual) + parseFloat(_saldo);
        this.consumoModel = {
          cartaoConsumoId: this.consumo.cartaoConsumoId,
          numero: this.consumo.numero,
          descricao: this.consumo.descricao,
          valor: this.consumo.valor,
          validade: this.consumo.validade,
          Cpf: this.consumo.cpf,
          Desconto: this.consumo.desconto,
          Nome: this.consumo.nome,
          restauranteId: this.consumo.restauranteId,
          saldoAtual: _saldo,
        };
        console.log(this.consumoModel);
        console.log(this.mov.valor);
        console.log(soma);
        this.CartaoConsumoService.insertMov(this.mov).then(() =>
          location.reload()
        );
      } else if (this.mov.tipoMov === '2') {
        let desc =
          parseFloat(_saldo) * (parseFloat(this.consumo.desconto) / 100);
        let soma =
          parseFloat(this.consumo.saldoAtual) - parseFloat(_saldo) + desc;
        if (soma > 0) {
          this.consumoModel = {
            cartaoConsumoId: this.consumo.cartaoConsumoId,
            numero: this.consumo.numero,
            descricao: this.consumo.descricao,
            valor: this.consumo.valor,
            validade: this.consumo.validade,
            Cpf: this.consumo.cpf,
            Desconto: this.consumo.desconto,
            Nome: this.consumo.nome,
            restauranteId: this.consumo.restauranteId,
            saldoAtual: _saldo,
          };
          this.CartaoConsumoService.insertMov(this.mov).then(() =>
            location.reload()
          );
        } else {
          window.alert('Saldo Insuficiente!');
        }
      }
    } else {
      window.alert('Por favor insira todos os campos!');
    }
  }

  async deleteMovById(id: any) {
    this.CartaoConsumoService.deleteMovById(id).then(() => location.reload());
  }

  catchMovId(id: any) {
    this.CartaoConsumoService.movIdAtual = id;
    console.log(this.CartaoConsumoService.movIdAtual);
  }

  EditMovById(_saldo: any) {
    this.CartaoConsumoService.obterMovById(
      this.CartaoConsumoService.movIdAtual
    ).then((movE) => {
      this.movimentacao = movE;
    });
    this.movE = {
      cartaoConsumoId: this.consumo.cartaoConsumoId,
      saldo: _saldo,
      cartaoConsumoMovId:
        this.movimentacao.results[this.index].cartaoConsumoMovId,
      tipoMov: parseInt(this.movimentacao.results[this.index].tipoMov),
    };
    if (_saldo !== '') {
      this.CartaoConsumoService.updateMov(this.movE).then(() =>
        location.reload()
      );
    } else {
      window.alert('Por favor insira todas as Informações!');
    }
  }
}
