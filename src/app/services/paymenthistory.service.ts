import { Injectable } from '@angular/core';
import { Paymenthistory } from '../model/Payment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymenthistoryService {

  constructor(private httpclient:HttpClient) { }

  getAllPayment(): Observable<Paymenthistory[]> {
    return this.httpclient.get<Paymenthistory[]>('http://localhost:8080/getPaymentHistory');
  }
  
}
