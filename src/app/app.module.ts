import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { InvestmentsTableComponent } from './investments-table/investments-table.component';
import { InvestmentFormComponent } from './investment-form/investment-form.component';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { TextMaskModule } from 'angular2-text-mask';
import { InvestmentsService } from './services/investments.service';
import { ShareDataService } from './services/share-data.service.spec';
import { HelperService } from './services/helper.service';
import { AppNavComponent } from './app-nav/app-nav.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    AppNavComponent,
    InvestmentsTableComponent,
    NotFoundComponent,
    InvestmentFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    CurrencyMaskModule,
    TextMaskModule
  ],
  providers: [InvestmentsService, ShareDataService, HelperService],
  bootstrap: [AppComponent]
})
export class AppModule {}
