import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';

import { Investment } from '../models/investment';
import {  } from '../common/app-error';
import { ShareDataService } from './share-data.service';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class InvestmentsService {
  private baseUrl = 'https://api-card-invest-gor.herokuapp.com';
  private url = '/card-invest/investment';
  private investments: Investment[] = [];
  private token = sessionStorage.getItem('token');
  private headers = new Headers();


  constructor(private http: Http) {
      this.headers.append('Content-Type', 'application/json');
      this.headers.append('Authorization', `Bearer ${this.token}`);
   }

  getInvestments(): Observable<Investment[]> {
    return this.http
      .get(`${this.baseUrl}${this.url}`, { headers: this.headers })
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  addInvestment(investment: Investment): Observable<Investment[]> {
    return this.http
      .post(`${this.baseUrl}${this.url}`, investment, { headers: this.headers })
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  updateInvestment(investment: Investment, id: string): Observable<Investment[]> {
    return this.http
      .put(`${this.baseUrl}${this.url}/${id}`, investment, { headers: this.headers })
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  deleteInvestment(id: string): Observable<Investment[]> {
    return this.http
      .delete(`${this.baseUrl}${this.url}/${id}`, { headers: this.headers })
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  private handleError(errorResponse) {
    return Observable.throw(errorResponse.error);
  }
}
