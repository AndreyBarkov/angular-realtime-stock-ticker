import { Component, OnInit } from '@angular/core';
import {Widget} from '../../models/widget';
import {StockService} from '../../services/stock-service/stock.service';

@Component({
  selector: 'app-widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['./widget-list.component.scss']
})
export class WidgetListComponent implements OnInit {
  widgets: Widget[] = [];
  errors: string[] = [];
  NumOfWidgets = 0;

  constructor(private stockService: StockService) { }

  ngOnInit() {
    this.Initialize();
    // setInterval( () => this.updateWidgets(), 1000);
   // this.stockService.addNewWidget('aapl');
    this.stockService.addNewWidget('tsla');
  }
  Initialize() {
    this.stockService.getWidgets().subscribe(widgets => this.widgets = widgets);
    this.stockService.getErrors().subscribe(errors => this.errors = errors);
  }
   addWidget(symbol: string): void {
     this.stockService.addNewWidget(symbol);
  }
  removeWidget(widget: Widget): void {
    this.stockService.removeWidget(widget);
  }
  clearErrors(): void {
    this.stockService.clearErrors();
  }
}


