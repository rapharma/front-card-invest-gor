import {
  TestBed,
  ComponentFixture,
  async,
  fakeAsync,
  tick
} from '@angular/core/testing';
import { Observable } from 'rxjs/rx';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';

import { InvestmentsTableComponent } from './investments-table.component';
import { InvestmentsService } from '../services/investments.service';
import { Investment } from '../models/product';

xdescribe('InvestmentsTableComponent (async)', () => {
  let fixture: ComponentFixture<InvestmentsTableComponent>;
  let component: InvestmentsTableComponent;
  let service: InvestmentsService;
  let testProducts: Investment[];

  beforeEach(() => {
    testProducts = [
      {
        id: 1,
        name: 'p1',
        description: 'p1 description',
        price: 10,
        isAvailable: true
      },
      {
        id: 2,
        name: 'p2',
        description: 'p2 description',
        price: 20,
        isAvailable: false
      },
      {
        id: 3,
        name: 'p3',
        description: 'p3 description',
        price: 30,
        isAvailable: true
      }
    ];

    TestBed.configureTestingModule({
      declarations: [InvestmentsTableComponent],
      imports: [RouterTestingModule, HttpModule],
      providers: [InvestmentsService]
    });

    fixture = TestBed.createComponent(InvestmentsTableComponent);
    component = fixture.componentInstance;
    service = TestBed.get(InvestmentsService);
  });

  it('should set products property with the items returned from the server (Observable)', () => {
    spyOn(service, 'getProducts').and.returnValue(
      Observable.from([testProducts])
    );

    fixture.detectChanges();

    expect(component.products).toEqual(testProducts);
  });


});
