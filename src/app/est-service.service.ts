import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { iEst } from './iEst';
import { iRes } from './iRes';
import { iCx1 } from './iCx1';
import { iCx2 } from './iCx2';
import { iMovXandao } from './iMovXandao';
import { iResp } from './iResp';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EstServiceService {
  public isAdmin: any;
  constructor(private HttpClient: HttpClient) {}

  //insert mov
  public insertMov(mov: iMovXandao) {
    return this.HttpClient.post<iMovXandao>(
      `${environment.apiurl}api/CartaoConsumo/adicionarMov`,
      mov
    ).toPromise();
  }

  //rest id
  public obterResById() {
    return this.HttpClient.get<iRes>(
      `${environment.apiurl}api/Restaurante/getById/${environment.resId}`
    ).toPromise();
  }

  public obterTudo() {
    return this.HttpClient.get<iEst[]>(
      `${environment.apiurl}api/Estacionamento/obterTodosEst/`
    ).toPromise();
  }

  public obterTudoAberto() {
    return this.HttpClient.get<iEst[]>(
      `${environment.apiurl}api/Estacionamento/obterTodosEstAbertos/`
    ).toPromise();
  }

  public obterTudoAbertoPorDia(date: any) {
    return this.HttpClient.get<iEst[]>(
      `${environment.apiurl}api/Estacionamento/obterByDate/${date}`
    ).toPromise();
  }

  public obterById(id: any) {
    return this.HttpClient.get<iEst>(
      `${environment.apiurl}api/Estacionamento/obterByEstId/${id}`
    ).toPromise();
  }

  public insert(est: iEst) {
    return this.HttpClient.post<iEst>(
      `${environment.apiurl}api/Estacionamento/adicionar`,
      est
    ).toPromise();
  }

  public update(est: iEst) {
    return this.HttpClient.put<iEst>(
      `${environment.apiurl}api/Estacionamento/alterar`,
      est
    ).toPromise();
  }

  public updateByDate(est: iEst) {
    return this.HttpClient.put<iEst>(
      `${environment.apiurl}api/Estacionamento/alterarByDate`,
      est
    ).toPromise();
  }

  public delete(id: any) {
    return this.HttpClient.delete<iEst>(
      `${environment.apiurl}api/Estacionamento/deletar/${id}`
    ).toPromise();
  }

  //caixa1

  public obterTudoCx1() {
    return this.HttpClient.get<iCx1[]>(
      `${environment.apiurl}api/Estacionamento/obterTodosCx1/`
    ).toPromise();
  }

  public obterCx1ById(id: any) {
    return this.HttpClient.get<iCx1>(
      `${environment.apiurl}api/Estacionamento/obterByCx1Id/${id}`
    ).toPromise();
  }

  public insertCx1(cx: iCx1) {
    return this.HttpClient.post<iCx1>(
      `${environment.apiurl}api/Estacionamento/adicionarCx1`,
      cx
    ).toPromise();
  }

  public updateCx1(cx: iCx1) {
    return this.HttpClient.put<iCx1>(
      `${environment.apiurl}api/Estacionamento/alterarCx1`,
      cx
    ).toPromise();
  }

  public updateCx1Es(cx: iCx1) {
    return this.HttpClient.put<iCx1>(
      `${environment.apiurl}api/Estacionamento/alterarCx1Es`,
      cx
    ).toPromise();
  }

  //caixa2

  public obterTudoCx2() {
    return this.HttpClient.get<iCx2[]>(
      `${environment.apiurl}api/Estacionamento/obterTodosCx2/`
    ).toPromise();
  }

  public obterCx2ById(id: any) {
    return this.HttpClient.get<iCx2>(
      `${environment.apiurl}api/Estacionamento/obterByCx1Id/${id}`
    ).toPromise();
  }

  public insertCx2(cx: iCx2) {
    return this.HttpClient.post<iCx2>(
      `${environment.apiurl}api/Estacionamento/adicionarCx2`,
      cx
    ).toPromise();
  }

  public updateCx2(cx: iCx2) {
    return this.HttpClient.put<iCx2>(
      `${environment.apiurl}api/Estacionamento/alterarCx2`,
      cx
    ).toPromise();
  }
}
