import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { WidgetListComponent } from './components/widget-list/widget-list.component';
import { StockService } from './services/stock-service/stock.service';
import { AppRoutingModule } from './/app-routing.module';
import { StockDetailComponent } from './components/stock-detail/stock-detail.component';





@NgModule({
  declarations: [
    AppComponent,
    WidgetListComponent,
    StockDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [StockService, ],
  bootstrap: [AppComponent]
})
export class AppModule { }
