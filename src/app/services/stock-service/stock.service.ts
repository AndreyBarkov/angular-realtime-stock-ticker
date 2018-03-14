import { Injectable } from '@angular/core';
import {Widget} from '../../models/widget';
import { CompanyDetails } from '../../models/company-details';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap, mergeMap } from 'rxjs/operators';

@Injectable()
export class StockService {
  widgets: Widget[] = [];
  errors: string[] = [];
  updatingWidgets = false;
  updateInterval: any;
  constructor(private http: HttpClient) { }

  fetchWidgetData(symbol: string): Observable<Widget> {
    const url = `https://api.iextrading.com/1.0/stock/${symbol}/chart/dynamic`;
    return this.http.get<Widget>(url)
      .pipe(
        catchError(this.handleError('fetchWidgetData', null))
      );
  }
  fetchCompanyData(symbol: string): Observable<CompanyDetails> {
    const url  = `https://api.iextrading.com/1.0/stock/${symbol}/company`;
    return this.http.get<CompanyDetails>(url)
      .pipe(
        catchError(this.handleError('fetchWidgetData', null))
      );
  }

  updateWidgetsData() {
    console.log('updating...');
    this.widgets.forEach( (widget) =>
      this.fetchWidgetData(widget.symbol).subscribe(item => widget.data = item.data[Object.keys(item.data).length - 1])
    );
  }

  SetWidgetUpdate (flag: boolean): void {
    if (flag) {
      this.updateInterval = setInterval( () => this.updateWidgetsData(), 1000);
      this.updatingWidgets = true;
    } else {
      clearInterval(this.updateInterval);
      this.updatingWidgets = false;
    }
  }

 async addNewWidget(symbol: string) {
    this.clearErrors();
    const resp = await fetch(`https://api.iextrading.com/1.0/stock/${symbol}/chart/dynamic`);
    if (resp.ok === true) {
      const newWidget = {symbol: symbol, data: {}};
      this.widgets.push(newWidget);
      if ( this.widgets.length > 0 && !this.updatingWidgets) {
        this.SetWidgetUpdate(true);
      }
    } else {
      this.logError(`Failed to find ${symbol} in list of stocks`);
    }
  }

  removeWidget(widget: Widget) {
    const index: number = this.widgets.indexOf(widget);
    if (index !== -1) {
      this.widgets.splice(index, 1);
    }
    if ( this.widgets.length < 1 && this.updatingWidgets) {
      this.SetWidgetUpdate(false);
    }
  }

  getWidgets(): Observable<Widget[]> {
    return of(this.widgets);
  }

  getWidgetBySymbol(symbol: string): Observable<Widget> {
    const widget = this.widgets.filter(item => item.symbol === symbol);
    return of(widget[0]);
  }

  widgetExists(symbol): boolean {
    if (this.getWidgetBySymbol(symbol).value == null) {
       return false;
    } else {
       return true;
    }
  }
  getErrors(): Observable<string[]> {
    return of(this.errors);
  }

   private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log('ATTENTION: ' + error); // log to console instead
     // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  logError(error: string) {
    this.errors.push(error);
  }

  clearErrors() {
    this.errors.splice(0, this.errors.length);
  }
}


//check for duplicates
