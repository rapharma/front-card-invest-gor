import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as moment from 'moment';

@Injectable()
export class HelperService {

  formatDateGet(date) {
    return moment(date.split('T')[0], 'YYYY-MM-DD').format('DD-MM-YYYY').replace(/-/g, '/')
  }

  formatDateInsert(form) {
    return moment(form.value.date , 'DD-MM-YYYY').format('YYYY-MM-DD')
  }

  getDateMask() {
    return [/[1-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  }

}
