import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WidgetListComponent } from './components/widget-list/widget-list.component';
import {StockDetailComponent } from './components/stock-detail/stock-detail.component';

const routes: Routes = [
  { path: 'widgets', component: WidgetListComponent },
  { path: 'stock/:symbol', component: StockDetailComponent },
  { path: '', redirectTo: '/widgets', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
