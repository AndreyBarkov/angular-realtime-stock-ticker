import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { StockService } from '../../services/stock-service/stock.service';
import {CompanyDetails} from '../../models/company-details';
import { Widget } from '../../models/widget';

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.css']
})
export class StockDetailComponent implements OnInit {
  private info: CompanyDetails;
  private widget: Widget;

  constructor( private route: ActivatedRoute, private stockService: StockService, private location: Location) { }

  ngOnInit() {
    this.getStockDetails();
  }
  async getStockDetails() {
    const symbol = this.route.snapshot.paramMap.get('symbol');
    if (!this.stockService.widgetExists(symbol)) {
      console.log('start waiting');
      await this.stockService.addNewWidget(symbol);
      console.log('resolved');
    }
    this.stockService.getWidgetBySymbol(symbol).subscribe(widget => this.widget = widget);
    this.stockService.fetchCompanyData(symbol).subscribe(info => this.info = info);
  }
}
