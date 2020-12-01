import {
  HttpModule,
  Response,
  ResponseOptions,
  RequestMethod
} from '@angular/http';
import { TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { InvestmentsService } from './investment.service';
import { Investment } from '../models/investment';
import { Headers } from '@angular/http';

describe('Investment', () => {
  let service: InvestmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        InvestmentsService
      ]
    });

    service = TestBed.get(InvestmentsService);
  });

  it('should call the list of investments and returning an error', () => {
   spyOn(service, 'getInvestments').and.callThrough();
   service.getInvestments().subscribe(
     (res) => {
      res = res ? res : [];
     },
     (err) => {
       expect(err).toContain('failed');
     }
   );
  });

  it('should call addInvestment and return an error', () => {
    spyOn(service, 'addInvestment').and.callThrough();
    service.addInvestment(new Investment()).subscribe(
      (res) => {
        res = res ? res : [];
       },
       (err) => {
         expect(err).toContain('failed');
       }
      );
   });

   it('should call updateInvestment and return an error', () => {
    spyOn(service, 'updateInvestment').and.callThrough();
    service.updateInvestment(new Investment(), '4321').subscribe(
      (res) => {
        res = res ? res : [];
       },
       (err) => {
         expect(err).toContain('failed');
       }
      );
   });

   it('should call deleteinvestment and return an error', () => {
    spyOn(service, 'deleteInvestment').and.callThrough();
    service.deleteInvestment('4321').subscribe(
      (res) => {
        res = res ? res : [];
       },
       (err) => {
         expect(err).toContain('failed');
       }
      );
   });

});
