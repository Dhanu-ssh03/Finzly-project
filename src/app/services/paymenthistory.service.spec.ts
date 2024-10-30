import { TestBed } from '@angular/core/testing';

import { PaymenthistoryService } from './paymenthistory.service';

describe('PaymenthistoryService', () => {
  let service: PaymenthistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymenthistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
