import { Component, OnInit, AfterViewInit, OnDestroy, EventEmitter, Output } from '@angular/core';

import { Investment } from '../../models/investment';
import { InvestmentsService } from '../../services/investment.service';
import * as moment from 'moment';
import { ShareDataService } from '../../services/share-data.service';
import { HelperService } from '../../services/helper.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

const EMPTY = '';

const enum MESSAGES {
  loginMessageError = 'There was a problem with base connection, try to refresh the page',
  noData = 'There are no investments for while',
  failedList = 'List investments failed, try refresh the page',
  failedDelete = 'Delete investment failed, try refresh the page'
}

@Component({
  selector: 'app-investments-table',
  templateUrl: './investments-table.component.html',
  styleUrls: ['./investments-table.component.less']
})

export class InvestmentsTableComponent implements OnInit, OnDestroy {
  investments: Investment[] = [];
  investment: Investment;
  user: User;

  token: string;
  userLogged: string;
  showTable: boolean;
  errorLogin: boolean;

  tableMessageError: string;
  loginMessageError: string;
  noDataMessage: string;

  getSubscription = new Subscription();
  deleteSubscription = new Subscription();
  regiterSubscription = new Subscription();
  authenticateSubscription = new Subscription();


  constructor(private service: InvestmentsService,
    private shareData: ShareDataService,
    private helperService: HelperService,
    private router: Router,
    private userService: UserService
  ) {
    this.investment = new Investment();
    this.showTable = true;
    this.tableMessageError = '';
    this.loginMessageError = '';
    this.noDataMessage = MESSAGES.noData;
  }

  ngOnDestroy() {
    this.getSubscription.unsubscribe();
    this.deleteSubscription.unsubscribe();
  }

  ngOnInit() {

    this.errorLogin = this.loginMessageError.length > 0;

    this.initializeUser();

    this.registerUser();

  }

  listInvestments() {
    this.token = this.getToken();
    this.getSubscription = this.service.getInvestments(this.token).subscribe(
      (res) => {
        this.tableMessageError = '';
        this.investments = [];
        res['investments'].map(p => {
          this.investment._id = p._id;
          this.investment.type = p.type;
          this.investment.value = p.value;
          this.investment.date = this.helperService.formatDateGet(p.date);
          this.investments.push({ ...this.investment });
        });
      },
      (error) => {
        this.tableMessageError = MESSAGES.failedList;
      }
    );
  }

  itemFormSelected(p) {
    this.transferItemForm(p);
    this.router.navigate(['/investments', 'update']);
  }

  transferItemForm(p) {
    this.investment._id = p._id;
    this.investment.type = p.type;
    this.investment.value = p.value;
    this.shareData.sendInvestmentItem({ ...this.investment });
  }

  onDelete(investmentId) {
    this.token = this.getToken();
    if (confirm('Are you sure you want to delete?')) {
      this.deleteSubscription = this.service.deleteInvestment(investmentId, this.token).subscribe(
        () => {
          this.investments = this.investments.filter(
            product => product._id !== investmentId
          );
        },
        (error) => {
          this.tableMessageError = MESSAGES.failedDelete;
        }
      );
    }
  }

  initializeUser() {
    this.user = new User();
    this.user.name = 'John';
    this.user.email = `john${Math.random().toString()}@gmail.com`;
    this.user.password = 'banana';
  }

  private registerUser() {
    this.regiterSubscription = this.userService.registerUser(this.user).subscribe(
      (res) => {
        this.loginMessageError = '';
        const userBody = new User();
        userBody.name = this.user.name;
        userBody.email = this.user.email;
        userBody.password = this.user.password;
        this.authentUser(userBody, res.user);
      },
      (error) => {
        this.loginMessageError = MESSAGES.loginMessageError;
      }
    );
  }

  private authentUser(userBody, responseUsername) {
    this.authenticateSubscription = this.userService.authenticateUser(userBody).subscribe(
      (res) => {
        this.loginMessageError = '';
        this.token = res.token;
        sessionStorage.clear();
        sessionStorage.setItem('token', this.token);
        sessionStorage.setItem('username', responseUsername);
        this.shareData.sendToken(this.token);
        this.listInvestments();
      },
      (error) => {
        this.loginMessageError = MESSAGES.loginMessageError;

      }
    );
  }

  getToken(): string {
    return sessionStorage.getItem('token') !== undefined ? sessionStorage.getItem('token') : '';
  }

}
