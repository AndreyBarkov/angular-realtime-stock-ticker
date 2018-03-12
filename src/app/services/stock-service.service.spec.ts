import { TestBed, inject } from '@angular/core/testing';

import { StockServiceService } from './stock-service.service';

describe('StockServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StockServiceService]
    });
  });

  it('should be created', inject([StockServiceService], (service: StockServiceService) => {
    expect(service).toBeTruthy();
  }));
});
