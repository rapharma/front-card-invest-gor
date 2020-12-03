import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

import { InvestmentsTableComponent } from './components/investments-table/investments-table.component';
import { InvestmentFormComponent } from './components/investment-form/investment-form.component';
import { TextMaskModule } from 'angular2-text-mask';
import { InvestmentsService } from './services/investment.service';
import { ShareDataService } from './services/share-data.service';
import { HelperService } from './services/helper.service';
import { AppNavComponent } from './components/app-nav/app-nav.component';
import { AppRoutingModule } from './app-routing.module';
import { UserService } from './services/user.service';
import { ChartComponent } from './components/chart/chart.component';
import { ChartService } from './services/chart.service';
import { StorageServ } from './services/storage.service';

@NgModule({
  declarations: [
    AppComponent,
    AppNavComponent,
    InvestmentsTableComponent,
    NotFoundComponent,
    InvestmentFormComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    TextMaskModule
  ],
  providers: [InvestmentsService, ShareDataService, HelperService, UserService, ChartService, StorageServ],
  bootstrap: [AppComponent]
})
export class AppModule {}
