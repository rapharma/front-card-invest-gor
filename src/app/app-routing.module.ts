import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvestmentFormComponent } from './components/investment-form/investment-form.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { InvestmentsTableComponent } from './components/investments-table/investments-table.component';

const appRoutes: Routes = [
  { path: '' || 'investments', component: InvestmentsTableComponent },
  { path: 'investments/:update', component: InvestmentFormComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
