import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as moment from 'moment';

@Injectable()
export class HelperService {

  formatDateGet(date) {
    return moment(date.split('T')[0], 'YYYY-MM-DD').format('DD-MM-YYYY').replace(/-/g, '/');
  }

  formatDateInsert(form) {
    return moment(form.value.date , 'DD-MM-YYYY').format('YYYY-MM-DD');
  }

  formatDateAuxChart(date) {
    return moment(date.split('T')[0], 'YYYY-MM-DD').format('YYYY-MM-DD');
  }

  formatDateChart(date) {
    return moment(date, 'MM-DD-YYYY').add(1, 'days').format('DD-MM-YYYY').replace(/-/g, '/');
  }

  getDateMask() {
    return [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  }


}
