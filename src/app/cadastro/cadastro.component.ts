import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EstServiceService } from '../est-service.service';
import { iEst } from '../iEst';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { environment } from 'src/environments/environment';
import { iCx1 } from '../iCx1';
import { iCx2 } from '../iCx2';
import jsPDF from 'jspdf';
import { Printd } from 'printd';
import { iMovXandao } from '../iMovXandao';
import { iResp } from '../iResp';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent implements OnInit {
  @ViewChild('imp', { static: false }) el!: ElementRef;
  constructor(private router: Router, private est: EstServiceService) {}

  estModel: iEst = new iEst();
  cx1Model: iCx1 = new iCx1();
  cx2Model: iCx2 = new iCx2();
  iMovModel: iMovXandao = new iMovXandao();
  respModel: iResp = new iResp();
  restaurante: any;
  valorDiaria: any;
  valorDiariaConvert: any = 0;
  diarias: any = 0;
  valorTotal: any = 0;
  valorConvert: any = 0;
  tipoMov: any;
  especie: any;
  isConsumo: any;
  resp: any;
  mensagem1: any = "Erro no cadastro";
  mensagem2: any = "Por favor insira as informações corretamente!";
  botao: any = "OK!";
  botaoLiberado: any = false;

  async ngOnInit() {
    await this.est.obterResById().then((res) => {
      this.restaurante = res;
    });
    console.log(this.restaurante);
    this.valorDiaria = this.restaurante.valorEst;
    this.valorDiariaConvert = this.converterCurrency(this.valorDiaria)
    console.log(this.restaurante.valorEst);
  }

  checkConsumo(valor: any) {
    if (valor == 4) {
      this.isConsumo = true;
    } else {
      this.isConsumo = false;
    }
  }

  async printThisPage() {
    let pdf = new jsPDF('p', 'pt', 'a4');
    await pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.autoPrint();
        window.open(pdf.output('bloburl'), '_blank');
      },
    });
  }

  async dateDiff(dtIni: any, dtFim: any) {
    let data1 = new Date(dtIni);
    let data2 = new Date(dtFim);
    var Time = data2.getTime() - data1.getTime();
    this.diarias = Time / (1000 * 3600 * 24);
    console.log(this.diarias);
    this.valorTotal = this.valorDiaria * this.diarias;
    this.valorConvert = this.converterCurrency(this.valorTotal);
  }

  async insertEst(
    _empresa: any,
    _apto: any,
    _placa: any,
    _modelo: any,
    _entrada: any,
    _saida: any,
    _valorTotal: any,
    _metodo: any,
    nroCartao?: any
  ) {
    if (_empresa == '' || _apto == '' || _placa == '' || _modelo == '') {
      this.mensagem1 = "Erro no cadastro";
      this.mensagem2 = "Por favor insira as informações corretamente!";
      this.botao = "OK!";
    } else if (
      this.diarias < 1 ||
      this.diarias == undefined ||
      isNaN(this.diarias)
    ) {
      this.mensagem1 = "Erro no cadastro";
      this.mensagem2 = "Por favor insira o número de diarias corretamente!";
      this.botao = "OK!";
    } else {
      this.estModel = {
        empresa: _empresa,
        apto: _apto,
        placa: _placa,
        modelo: _modelo,
        entrada: _entrada,
        saida: _saida,
        valorTotal: _valorTotal,
        metodo: _metodo,
      };
      this.mensagem1 = "Cadastro Confirmado";
      this.mensagem2 = "Deseja gerar um comprovante?";
      this.botao = "Não";
      this.botaoLiberado = true;
    }

    if (_metodo == 4) {
      if (nroCartao !== '') {
        this.iMovModel = {
          restauranteId: environment.resId,
          numeroCartao: nroCartao,
          valor: _valorTotal,
          tipoMov: 2,
        };
        await this.est.insertMov(this.iMovModel).then((resp) => {
          this.resp = resp;
          console.log(this.resp);

          if (this.resp.aproved == true) {
            this.estModel = {
              empresa: _empresa,
              apto: _apto,
              placa: _placa,
              modelo: _modelo,
              entrada: _entrada,
              saida: _saida,
              valorTotal: this.resp.valor,
              metodo: _metodo,
            };
            this.est
              .insert(this.estModel)
              .then(() => console.log(this.estModel));
          } else {
            return window.alert(this.resp.mensage);
          }
        });
      } else {
        return window.alert('Digite o número do cartão!');
      }
    } else {

      this.est.insert(this.estModel).then(() => console.log(this.estModel));
    }
  }

  goToAdmin(login: any, senha: any) {
    if (login == environment.login && senha == environment.senha) {
      localStorage.setItem('admin', '1');
      this.est.isAdmin = localStorage.getItem('admin');
      console.log(this.est.isAdmin);
      this.router.navigate(['/adm']);
    } else if (login == environment.loginc && senha == environment.senhac) {
      localStorage.setItem('admin', '3');
      this.est.isAdmin = localStorage.getItem('admin');
      this.router.navigate(['/adm']);
    } else {
      localStorage.setItem('admin', '2');
      this.est.isAdmin = localStorage.getItem('admin');
      alert('Credenciais Incorretas!');
    }
  }

  logout() {
    localStorage.setItem('admin', '2');
    this.router.navigate(['/login']);
  }

 converterCurrency(valor: number) {
     return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
  }

  converterLongDate(data: any) {
    let dataFormatada = new Date(data).toLocaleDateString()
    return  dataFormatada;
  }

  reload(){window.location.reload()}
}
