import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Investment } from '../models/product';


@Injectable()
export class ShareDataService {
  product: Investment;

  private dataSource = new BehaviorSubject(this.product);
  currentData = this.dataSource.asObservable();

  constructor() { }

  sendData(data) {
    this.dataSource.next(data)
  }

}
