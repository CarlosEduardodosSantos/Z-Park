import { Component, OnInit } from '@angular/core';
import { EstServiceService } from '../est-service.service';
import { iEst } from '../iEst';
import { iRes } from '../iRes';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { iCx1 } from '../iCx1';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-adm',
  templateUrl: './adm.component.html',
  styleUrls: ['./adm.component.css'],
})
export class AdmComponent implements OnInit {
  constructor(private router: Router, private est: EstServiceService) {}
  restaurante: any;
  estacionamento: any;
  diarias: any;
  item: any;
  totalDinheiro: any;
  totalCartao: any;
  valorDiaria: any;
  valorDiariaConvert: any = 0;
  resp: any;
  dataagora = new Date().toISOString().substring(0, 10);
  estModel: iEst = new iEst();
  cx1Model: iCx1 = new iCx1();
  resModel: iRes = new iRes();

  async ngOnInit() {
    await this.est.obterResById().then((res) => {
      this.restaurante = res;
      this.valorDiaria = this.restaurante.valorEst;
    this.valorDiariaConvert = this.converterCurrency(this.valorDiaria)
    });
    await this.est.obterTudoAbertoPorDia(this.dataagora).then((es) => {
      this.estacionamento = es;
    });
  }

  gotoCadastro() {
    this.router.navigate(['/cadastro']);
  }

  async searchByDate(data: any) {
    await this.est.obterTudoAbertoPorDia(data).then((es) => {
      this.estacionamento = es;
    });
  }

  dateDiff(dtIni: any, dtFim: any) {
    let data1 = new Date(dtIni);
    let data2 = new Date(dtFim);
    var Time = data2.getTime() - data1.getTime();
    return Time / (1000 * 3600 * 24);
  }

  converterLongDate(data: any) {
    let dataFormatada = new Date(data).toLocaleDateString()
    return  dataFormatada;
  }

  converterCurrency(valor: number) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
  }

  tipoPagamento(tipo: any) {
    if (tipo == 1) {
      return 'Dinheiro';
    } else if (tipo == 2) {
      return 'Débito';
    } else if (tipo == 3) {
      return 'Crédito';
    } else {
      return 'Cartão Consumo';
    }
  }

  sumValoresDinheiro() {
    const sum = this.estacionamento.results
      .filter((xx: any) => xx.metodo === 1)
      .reduce((sum: any, current: any) => sum + current.valorTotal, 0);
    this.totalDinheiro = sum;
    return this.converterCurrency(sum);
  }

  sumValoresCartao() {
    const sum = this.estacionamento.results
      .filter((xx: any) => xx.metodo !== 1)
      .reduce((sum: any, current: any) => sum + current.valorTotal, 0);
    this.totalCartao = sum;
    return this.converterCurrency(sum);
  }

  sumTotal() {
    return this.converterCurrency(this.totalCartao + this.totalDinheiro);
  }

  async fecharCaixa(data: any) {
    if (confirm('Tem certeza que deseja fechar o caixa?')) {
      for (let i = 0; i < this.estacionamento.results.length; i++) {
        this.cx1Model = {
          dataFx: this.dataagora,
          nroEs: this.estacionamento.results[i].nro,
        };
        console.log(this.cx1Model);
        await this.est.updateCx1Es(this.cx1Model);
      }
      this.estModel = { dataReg: data, fechado: true };
      await this.est.updateByDate(this.estModel);
      location.reload();
    }
  }

  logout() {
    localStorage.setItem('admin', '2');
    this.router.navigate(['/login']);
  }

  printThisPage() {
    window.print();
  }

  async updateVlDiaria(_vlDiaria: any,) {
    this.resModel = {restauranteId: environment.resId ,valorEst: _vlDiaria};
    console.log(this.resModel)
    await this.est.updateVlEst(this.resModel).then((resp) => {
      this.resp = resp;
      console.log(this.resp);
      window.location.reload();
  })
}
}

