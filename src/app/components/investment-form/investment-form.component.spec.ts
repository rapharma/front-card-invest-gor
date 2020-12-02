import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { InvestmentFormComponent } from './investment-form.component';
import { InvestmentsService } from '../../services/investment.service';
import { TextMaskConfig, TextMaskModule } from 'angular2-text-mask';
import { ShareDataService } from '../../services/share-data.service';
import { HelperService } from '../../services/helper.service';
import { NgZone } from '@angular/core/src/zone/ng_zone';
import { ActivatedRoute } from '@angular/router/src/router_state';
import { Router } from '@angular/router';

describe('InvestmentFormComponent', () => {
  let component: InvestmentFormComponent;
  let fixture: ComponentFixture<InvestmentFormComponent>;
  let service: InvestmentsService;
  let shareDataServ: ShareDataService;
  let ngZone: NgZone;
  let helperService: HelperService;
  let route: ActivatedRoute;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvestmentFormComponent],
      imports: [FormsModule, HttpModule, RouterTestingModule, TextMaskModule],
      providers: [InvestmentsService, ShareDataService, HelperService]
    });

    component = new InvestmentFormComponent(route, router, service, shareDataServ, ngZone, helperService);

  });

  it('should create InvestmentForm', () => {
    expect(component).toBeTruthy();
  });

});
