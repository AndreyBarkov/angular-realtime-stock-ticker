import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const widgets = [
      {id: 1, symbol: 'AAPL', name: 'Apple Inc', high: 179.68, low: 178.40, time: '9:30 AM' }
    ];
    return {widgets};
  }
}
