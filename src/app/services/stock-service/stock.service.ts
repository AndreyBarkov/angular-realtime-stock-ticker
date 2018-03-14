import { Injectable } from '@angular/core';
import {Widget} from '../../models/widget';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap, mergeMap } from 'rxjs/operators';

@Injectable()
export class StockService {
  widgets: Widget[] = [];
  errors: string[] = [];
  constructor(private http: HttpClient) { }

  fetchWidgetData(symbol: string): Observable<Widget> {
    const widgetUrl = `https://api.iextrading.com/1.0/stock/${symbol}/chart/dynamic`;
    return this.http.get<Widget>(widgetUrl)
      .pipe(
        catchError(this.handleError('fetchWidgetData', null))
      );
  }

  updateWidgetsData() {
    console.log('updating....');
    this.widgets.forEach( (widget) =>
      this.fetchWidgetData(widget.symbol).subscribe(item => widget.data = item.data[Object.keys(item.data).length - 1])
    );
  }

 async addNewWidget(symbol: string) {
    this.clearErrors();
    const resp = await fetch(`https://api.iextrading.com/1.0/stock/${symbol}/chart/dynamic`);
    if (resp.ok === true) {
      const newWidget = {symbol: symbol, data: {}};
      this.widgets.push(newWidget);
    } else {
      this.logError(`Failed to find ${symbol} in list of stocks`);
    }
  }
  removeWidget(widget: Widget) {
    const index: number = this.widgets.indexOf(widget);
    if (index !== -1) {
      this.widgets.splice(index, 1);
    }
  }

  getWidgets(): Observable<Widget[]> {
    return of(this.widgets);
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

// remove widgets from array
// stock detail component
// routing to stock details
