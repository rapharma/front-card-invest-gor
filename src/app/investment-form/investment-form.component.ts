import { Component, OnInit, ViewChild, Output, EventEmitter, Input, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Investment } from '../models/product';
import { InvestmentsService } from '../services/investments.service';
import { } from '../common/app-error';
import * as moment from 'moment';
import { ShareDataService } from '../services/share-data.service.spec';
import { HelperService } from '../services/helper.service';

@Component({
  selector: 'app-investment-form',
  templateUrl: './investment-form.component.html',
  styleUrls: ['./investment-form.component.less']
})
export class InvestmentFormComponent implements OnInit {
  id: number;
  investment: Investment;
  editData: boolean;
  mask: (string | RegExp)[];
  investmentsTypes: { value: string }[];
  successMessage: string;
  errorMessage: string;
  addTitle: string;
  editTitle: string;
  @Output() inserted = new EventEmitter<boolean>();

  @ViewChild('f') investForm: NgForm;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: InvestmentsService,
    private shareData: ShareDataService,
    private helperService: HelperService,
    private ngZone: NgZone
  ) {
    this.investment = new Investment();
    this.investmentsTypes = [];
    this.mask = this.helperService.getDateMask();
    this.addTitle = 'Add an investment';
    this.editTitle = 'Edit this investment';
  }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      const update = params.get('update');
      if (update) {
        this.editData = true;
      }
    });

    if (this.editData) {
      this.getTransferedItemForm();
    }

    this.initializeTypes();
  }

  initializeTypes() {
    this.investmentsTypes.push(
      {
        value: 'Fixed Income',
      },
      {
        value: 'Variable Income',
      }
    );
  }

  getTransferedItemForm() {
    this.shareData.currentData.subscribe(prod => {
      if (prod) {
        this.investment._id = prod._id;
        this.investment.type = prod.type;
        this.investment.value = prod.value;
        this.investment.date = this.helperService.formatDateGet(prod.date);
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
    this.service.addProduct(investBody).subscribe(
      (product: Investment) => {
        this.resetFields();
        this.ngZone.run(() => this.inserted.emit(true));
        this.successMessage = 'Investment added with success';
        setTimeout(() => { this.successMessage = ''; }, 2000);
      },
      (error) => {
        this.errorMessage = 'Failed to add investment';
        setTimeout(() => { this.errorMessage = ''; }, 2000);
      }
    );
  }

  private updateInvestment(investBody, idInvestment) {
    this.service.updateProduct(investBody, idInvestment).subscribe(
      (product: Investment) => {
        this.router.navigate(['/products']);
      },
      (error) => {
        this.errorMessage = 'Failed to update investment';
      }
    );
  }

  resetFields() {
    this.investForm.reset();
    this.investment.type = undefined;
  }

}
