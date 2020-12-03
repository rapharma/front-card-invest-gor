import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';

import { Investment } from '../models/investment';
import { Subscription } from 'rxjs/Subscription';
import { StorageService } from './storage.service';

enum ROUTE {
  baseUrl = 'https://api-card-invest-gor.herokuapp.com',
  main = '/card-invest/investment'
}
@Injectable()
export class InvestmentsService {
  private baseUrl = '';
  private mainUrl = '';
  private investments: Investment[] = [];
  private token: string;
  private tok: string;
  private headers = new Headers();

  constructor(private http: Http,
  private storage: StorageService) {
    this.baseUrl = ROUTE.baseUrl;
    this.mainUrl = ROUTE.main;
    this.token = sessionStorage.getItem('token');
    console.log('tok invest service', sessionStorage.getItem('token'));
    this.tok = this.storage.get('tok');
    console.log('tok serv', this.tok);
   }

  getInvestments(token): Observable<Investment[]> {

    this.inserHeader(this.token);
    return this.http
      .get(`${this.baseUrl}${this.mainUrl}`, { headers: this.headers })
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  addInvestment(investment: Investment, token): Observable<Investment[]> {
    this.inserHeader(token);
    return this.http
      .post(`${this.baseUrl}${this.mainUrl}`, investment, { headers: this.headers })
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  updateInvestment(investment: Investment, id: string, token): Observable<Investment[]> {
    this.inserHeader(token);
    return this.http
      .put(`${this.baseUrl}${this.mainUrl}/${id}`, investment, { headers: this.headers })
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  deleteInvestment(id: string, token): Observable<Investment[]> {
    this.inserHeader(token);
    return this.http
      .delete(`${this.baseUrl}${this.mainUrl}/${id}`, { headers: this.headers })
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  private handleError(errorResponse) {
    return Observable.throw(errorResponse.error);
  }

  private inserHeader(token) {
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', `Bearer ${this.token}`);
  }
}
