import {
  HttpModule,
  Response,
  ResponseOptions,
  RequestMethod
} from '@angular/http';
import { TestBed, async } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { InvestmentsService } from './investment.service';
import { Investment } from '../models/investment';
import { Http } from '@angular/http';
import { StorageServ } from './storage.service';
import {  } from '@angular/http';

describe('Investment', () => {
  let service: InvestmentsService;
  let storageService: StorageServ;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        InvestmentsService,
        StorageServ
      ]
    });

    service = TestBed.get(InvestmentsService);
  }));

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
