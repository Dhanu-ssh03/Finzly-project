import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../model/customer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerserviceService {

  constructor(private httpclient: HttpClient) { }

  saveCustomer(customer: Customer): Observable<Customer> {
   
    return this.httpclient.post<Customer>(`http://localhost:8080/saveCustomer`, customer);
  }

  uploadFile(file: File): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.httpclient.post<string>(`http://localhost:8080/upload`, formData, {responseType: 'text' as 'json'});
  }

  
}
