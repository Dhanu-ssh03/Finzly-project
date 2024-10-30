import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../model/customer';
import { Bill, Payment } from '../model/Payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentserviceService {
  getAllPayment() {
    throw new Error('Method not implemented.');
  }
  

  constructor(private httpclient:HttpClient) { }
  fetchPaymentData():Observable<Bill[]>{
    return this.httpclient.get<Bill[]>(`http://localhost:8080/getPaymentData`);
  }

  generateInvoice(billId:number): Observable<Blob> {
   
    return this.httpclient.get<Blob>(`http://localhost:8080/generateInvoice/${billId}`, {responseType: 'blob' as 'json'}); 
    
  }
  updatePayStatus(billId:number):Observable<void>{
    return this.httpclient.post<void>(`http://localhost:8080/updatePayStatus/${billId}`,null);
  }

  savePayment(billId:number):Observable<void> {
    return  this.httpclient.post<void>(`http://localhost:8080/savePayment/${billId}`,null);
    
  }

  invoiceMail(billId:number): Observable<void> {
    return this.httpclient.post<void>(`http://localhost:8080/invoiceMail/${billId}`,null); 
    
  }
}
