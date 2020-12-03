import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartComponent } from './chart.component';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { InvestmentsService } from '../../services/investment.service';
import { HelperService } from '../../services/helper.service';
import { StorageServ } from '../../services/storage.service';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;
  let service: InvestmentsService;
  let helperService: HelperService;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartComponent ],
      imports: [HttpModule, RouterTestingModule],
      providers: [InvestmentsService, HelperService, StorageServ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create chart', () => {
    expect(component).toBeTruthy();
  });
});
