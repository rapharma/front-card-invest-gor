import { InvestmentsTableComponent } from './investments-table.component';
import { InvestmentsService } from '../../services/investment.service';
import { Investment } from '../../models/investment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';
import { ShareDataService } from '../../services/share-data.service';
import { HelperService } from '../../services/helper.service';
import { Router } from '@angular/router';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../../services/user.service';
import { StorageServ } from '../../services/storage.service';

describe('InvestmentsTableComponent', () => {

  let component: InvestmentsTableComponent;
  let fixture: ComponentFixture<InvestmentsTableComponent>;
  let service: InvestmentsService;
  let shareDataServ: ShareDataService;
  let helperService: HelperService;
  let router: Router;
  let userServ: UserService;
  let userService: UserService;
  let storage: StorageServ;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvestmentsTableComponent],
      imports: [FormsModule, HttpModule, RouterTestingModule],
      providers: [InvestmentsService, , helperService, ShareDataService]
    });
    component = new InvestmentsTableComponent(service, shareDataServ, helperService, router, userService, storage);
  });

  it('should create InvestmentTable', () => {
    expect(component).toBeTruthy();
  });
});
