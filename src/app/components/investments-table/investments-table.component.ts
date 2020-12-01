import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

import { Investment } from '../models/investment';
import { InvestmentsService } from '../services/investment.service';
import { } from '../common/app-error';
import * as moment from 'moment';
import { ShareDataService } from '../services/share-data.service';
import { HelperService } from '../services/helper.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

const EMPTY = '';

const enum MESSAGES {
  noData = 'There are no investments for while',
  failedList = 'List investments failed',
  failedDelete = 'Delete investment failed'
}

@Component({
  selector: 'app-products',
  templateUrl: './investments-table.component.html',
  styleUrls: ['./investments-table.component.less']
})

export class InvestmentsTableComponent implements OnInit, OnDestroy {
  products: Investment[] = [];
  product: Investment;
  tableMessageError: string;
  showTable: boolean;
  noDataMessage: string;
  getSubscription: Subscription;
  deleteSubscription: Subscription;

  constructor(private service: InvestmentsService,
    private shareData: ShareDataService,
    private helperService: HelperService,
    private router: Router
  ) {
    this.product = new Investment();
    this.showTable = true;
    this.tableMessageError = '';
    this.noDataMessage = MESSAGES.noData;
  }

  ngOnDestroy() {
    this.getSubscription.unsubscribe();
    this.deleteSubscription.unsubscribe();
  }

  ngOnInit() {
    this.listInvestments();
  }

  listInvestments() {
    this.showTable = true;
    this.getSubscription = this.service.getInvestments().subscribe(
      (products) => {
        this.tableMessageError = '';
        products['investments'].map(p => {
          this.product._id = p._id;
          this.product.type = p.type;
          this.product.value = p.value;
          this.product.date = this.helperService.formatDateGet(p.date)
          this.products.push({ ...this.product });
        });
      },
      (error) => {
        this.tableMessageError = MESSAGES.failedList;
      }
    );
  }

  itemFormSelected(p) {
    this.transferItemForm(p);
    this.router.navigate(['/products', 'update']);
  }

  transferItemForm(p) {
    this.product._id = p._id;
    this.product.type = p.type;
    this.product.value = p.value;
    this.shareData.sendData({ ...this.product });
  }

  onDelete(productId) {
    if (confirm('Are you sure?')) {
      this.deleteSubscription = this.service.deleteInvestment(productId).subscribe(
        () => {
          this.products = this.products.filter(
            product => product._id !== productId
          );
        },
        (error) => {
          this.tableMessageError = MESSAGES.failedDelete;
        }
      );
    }
  }
}
