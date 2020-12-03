import { Component, OnInit, ViewChild, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Investment } from '../../models/investment';
import { InvestmentsService } from '../../services/investment.service';
import { } from '../common/app-error';
import * as moment from 'moment';
import { ShareDataService } from '../../services/share-data.service';
import { HelperService } from '../../services/helper.service';
import { Subscription } from 'rxjs';

const enum MESSAGES {
  successAdd = 'Investment added with success',
  failedUpdate = 'Failed to update investment',
  failedAdd = 'Failed to add investment',
}

const enum TYPES {
  fixed = 'Fixed Income',
  variable = 'Variable Income'
}

@Component({
  selector: 'app-investment-form',
  templateUrl: './investment-form.component.html',
  styleUrls: ['./investment-form.component.less']
})
export class InvestmentFormComponent implements OnInit, OnDestroy {
  id: number;
  investment: Investment;
  editData: boolean;
  mask: (string | RegExp)[];
  investmentsTypes: { value: string }[];
  successMessage: string;
  errorMessage: string;
  addTitle: string;
  editTitle: string;
  routeSubscription = new Subscription();
  shareDataSubscription = new Subscription();
  addDataSubscription = new Subscription();
  updateDataSubscription = new Subscription();
  @Output() inserted = new EventEmitter();
  hello = 'Hello';
  userLogged = this.getUsername();

  @ViewChild('f') investForm: NgForm;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: InvestmentsService,
    private shareData: ShareDataService,
    private helperService: HelperService,
  ) {
    this.investment = new Investment();
    this.investmentsTypes = [];
    this.addTitle = 'Add an investment';
    this.editTitle = 'Edit this investment';
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
    this.addDataSubscription.unsubscribe();
    this.updateDataSubscription.unsubscribe();
  }

  ngOnInit() {

    this.mask = this.helperService.getDateMask();

    this.verifyRouteParam();

    if (this.editData) {
      this.getTransferedItemForm();
    }

    this.initializeTypes();

  }

  initializeTypes() {
    this.investmentsTypes.push(
      {
        value: TYPES.fixed,
      },
      {
        value: TYPES.variable,
      }
    );
  }

  verifyRouteParam() {
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      const update = params.get('update');
      if (update) {
        this.editData = true;
      }
    });
  }

  getTransferedItemForm() {
    this.shareDataSubscription = this.shareData.currentData.subscribe(prod => {
      if (prod) {
        this.investment._id = prod._id;
        this.investment.type = prod.type;
        this.investment.value = prod.value;
        this.investment.date = this.helperService.formatDateGet(prod.date);
      } else {
        this.router.navigate(['/investments']);
      }
    });
  }

  onSubmit() {
    const idInvestment = this.investment._id;
    const dateFormat = this.helperService.formatDateInsert(this.investForm);
    const investBody = new Investment();
    investBody.type = this.investForm.value.type;
    investBody.value = this.investForm.value.value;
    investBody.date = dateFormat;

    if (!this.editData) {
      this.addInvestment(investBody);
    } else {
      this.updateInvestment(investBody, idInvestment)
    }
  }

  private addInvestment(investBody) {
    this.addDataSubscription = this.service.addInvestment(investBody).subscribe(
      (res: Investment[]) => {
        this.resetFields();
        this.inserted.emit();
        this.successMessage = MESSAGES.successAdd;
        setTimeout(() => { this.successMessage = ''; }, 2000);
      },
      (error) => {
        this.errorMessage = MESSAGES.failedAdd;
        setTimeout(() => { this.errorMessage = ''; }, 2000);
      }
    );
  }

  getUsername(): string {
    return sessionStorage.getItem('username') !== undefined ? sessionStorage.getItem('username') : '';
  }

  private updateInvestment(investBody, idInvestment) {
    this.updateDataSubscription = this.service.updateInvestment(investBody, idInvestment).subscribe(
      (res: Investment[]) => {
        this.router.navigate(['/investments']);
      },
      (error) => {
        this.errorMessage = MESSAGES.failedAdd;
      }
    );
  }

  resetFields() {
    this.investForm.reset();
    this.investment.type = undefined;
  }

}
