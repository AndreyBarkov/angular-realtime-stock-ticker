import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { WidgetListComponent } from './components/widget-list/widget-list.component';
import { StockServiceService } from './services/stock-service.service';


@NgModule({
  declarations: [
    AppComponent,
    WidgetListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [StockServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
