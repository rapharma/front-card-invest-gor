import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';

import { Investment } from '../models/investment';
import { ShareDataService } from './share-data.service';
import { Subscription } from 'rxjs/Subscription';

enum ROUTE {
  baseUrl = 'https://api-card-invest-gor.herokuapp.com',
  main = '/card-invest/investment'
}
@Injectable()
export class InvestmentsService implements OnInit {
  private baseUrl = '';
  private mainUrl = '';
  private investments: Investment[] = [];
  private token = '';
  private headers = new Headers();

  constructor(private http: Http,
  private shareData: ShareDataService) {
    this.baseUrl = ROUTE.baseUrl;
    this.mainUrl = ROUTE.main;
    this.token = '';
   }

  getInvestments(token): Observable<Investment[]> {
    console.log('get token', this.token);
    this.inserHeader(token);
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
