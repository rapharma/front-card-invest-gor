import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvestmentFormComponent } from './investment-form/investment-form.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { InvestmentsTableComponent } from './investments-table/investments-table.component';


const appRoutes: Routes = [
  { path: '' || 'products', component: InvestmentsTableComponent },
  { path: 'products/:update', component: InvestmentFormComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
