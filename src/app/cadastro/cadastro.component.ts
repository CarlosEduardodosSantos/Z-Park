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
  diarias: any = 0;
  valorTotal: any = 0;
  tipoMov: any;
  especie: any;
  isConsumo: any;
  resp: any;

  async ngOnInit() {
    await this.est.obterResById().then((res) => {
      this.restaurante = res;
    });
    console.log(this.restaurante);
    this.valorDiaria = this.restaurante.valorEst;
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
      window.alert('Por favor insira todas as informa????es');
    } else if (
      this.diarias < 1 ||
      this.diarias == undefined ||
      isNaN(this.diarias)
    ) {
      window.alert('O n??mero de di??rias n??o pode ser menor que 1!');
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
        return window.alert('Digite o n??mero do cart??o!');
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
}
