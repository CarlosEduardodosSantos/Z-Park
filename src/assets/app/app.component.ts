import { Component, OnInit } from '@angular/core';
import { CartaoConsumoService } from 'src/cartao-consumo.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { iConsumo } from '../app/iConsumo';
import { NumberFormatStyle } from '@angular/common';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'CartaoConsumoAngular';
  consumo: any;
  searchText: any;
  getValues(value: any) {
    console.warn(value);
  };
  constructor(private CartaoConsumoService: CartaoConsumoService, private router: Router) {
  }
  consumoModel: iConsumo = new iConsumo();
  consumId: any;
  getTxtValue() {
    console.warn(this.consumId);
  }

  getTxtInfo(_numero: any, _desc: any, _valor: any, _validade: any, _cpf: any, _desconto: any, _nome: any, _restaurante: any) {
    this.consumoModel = { numero: _numero.value, descricao: _desc.value, valor: _valor.value, validade: _validade.value, Cpf: _cpf.value, Desconto: _desconto.value, Nome: _nome.value, restauranteId: _restaurante.value };
    this.CartaoConsumoService.insertConsu(this.consumoModel).then(() => window.alert("Registro Inserido!"))
    console.log(this.consumoModel);
    location.reload();
  }

  getEditId(_guid: any, _numeroEdit: any, _descEdit: any, _valorEdit: any, _validadeEdit: any, _cpfEdit: any, _descontoEdit: any, _nomeEdit: any,  _restauranteEdit: any){
    this.consumoModel = {cartaoConsumoId: _guid, numero: _numeroEdit, descricao: _descEdit, valor: _valorEdit, validade: _validadeEdit, Cpf: _cpfEdit, Desconto: _descontoEdit, Nome: _nomeEdit, restauranteId:  _restauranteEdit };
  }

  EditById(_guid: any, _numeroEdit: any, _descEdit: any, _valorEdit: any, _validadeEdit: any, _cpfEdit: any, _descontoEdit: any, _nomeEdit: any, _restauranteEdit: any) {
    this.consumoModel = {cartaoConsumoId: _guid, numero: _numeroEdit, descricao: _descEdit, valor: _valorEdit, validade: _validadeEdit, Cpf: _cpfEdit, Desconto: _descontoEdit, Nome: _nomeEdit, restauranteId:  _restauranteEdit};
    this.CartaoConsumoService.updateConsu(this.consumoModel).then(() => window.alert("Registro Alterado!"))
    console.log(this.consumoModel);
    location.reload();
  }
  async ngOnInit() {
    
  }


  async obterConsulById(id: any) {
    if (id != null && id != "") {
      this.CartaoConsumoService.obterConsuById(this.consumId).then(consum => { this.consumo = consum; console.log(consum) });
    }
    else {
      this.CartaoConsumoService.obterTodosConsu().then(consum => { this.consumo = consum; console.log(consum) });
    }
  }

  async deleteById(id: any)
  {
    this.CartaoConsumoService.deleteConsu(id).then(() => window.alert("Registro Deletado!"));
    location.reload();
  }

}



