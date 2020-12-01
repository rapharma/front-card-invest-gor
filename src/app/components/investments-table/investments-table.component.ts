import { Component, OnInit, AfterViewInit, OnDestroy, EventEmitter, Output } from '@angular/core';

import { Investment } from '../../models/investment';
import { InvestmentsService } from '../../services/investment.service';
import { } from '../common/app-error';
import * as moment from 'moment';
import { ShareDataService } from '../../services/share-data.service';
import { HelperService } from '../../services/helper.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

const EMPTY = '';

const enum MESSAGES {
  noData = 'There are no investments for while',
  failedList = 'List investments failed',
  failedDelete = 'Delete investment failed'
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

  tableMessageError: string;
  showTable: boolean;
  noDataMessage: string;
  token: string;
  userLogged: string;

  getSubscription: Subscription;
  deleteSubscription: Subscription;
  regiterSubscription: Subscription;
  authenticateSubscription: Subscription;

  constructor(private service: InvestmentsService,
    private shareData: ShareDataService,
    private helperService: HelperService,
    private router: Router,
    private userService: UserService
  ) {
    this.investment = new Investment();
    this.showTable = true;
    this.tableMessageError = '';
    this.noDataMessage = MESSAGES.noData;
  }

  ngOnDestroy() {
    this.getSubscription.unsubscribe();
    this.deleteSubscription.unsubscribe();
  }

  ngOnInit() {

    this.initializeUser();

    this.registerUser();

  }

  private listInvestments() {
    this.showTable = true;
    this.getSubscription = this.service.getInvestments().subscribe(
      (res) => {
        this.tableMessageError = '';
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
    if (confirm('Are you sure you want to delete?')) {
      this.deleteSubscription = this.service.deleteInvestment(investmentId).subscribe(
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
        console.log('res.user');
        console.log(res.user);
        const userBody = new User();
        userBody.name = this.user.name;
        userBody.email = this.user.email;
        userBody.password = this.user.password;
        this.authentUser(userBody, res.user);
      },
      (error) => {

      }
    );
  }

  private authentUser(userBody, responseUsername) {
    this.authenticateSubscription = this.userService.authenticateUser(userBody).subscribe(
      (res) => {
        this.token = res.token;
        sessionStorage.clear();
        sessionStorage.setItem('token', this.token);
        sessionStorage.setItem('username', responseUsername);
        this.listInvestments();
      },
      (error) => {
        // this.errorMessage = MESSAGES.failedAdd;
      }
    );
  }

}
