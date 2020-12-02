import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Investment } from '../models/investment';


@Injectable()
export class ShareDataService {
  investment: Investment;

  private dataSourceInvestment = new BehaviorSubject(this.investment);
  currentData = this.dataSourceInvestment.asObservable();

  private dataSourceToken = new BehaviorSubject('');
  currentToken = this.dataSourceToken.asObservable();

  constructor() { }

  sendInvestmentItem(investItem) {
    this.dataSourceInvestment.next(investItem);
  }

  sendToken(token) {
    this.dataSourceToken.next(token);
  }

}