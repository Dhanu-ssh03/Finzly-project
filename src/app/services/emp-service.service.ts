import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseObject } from '../modal/response-object';

@Injectable({
  providedIn: 'root'
})
export class EmpServiceService {

  constructor(private httpclient:HttpClient) { }
 
  validEmpId(empId:any):Observable<ResponseObject>{
    
    return this.httpclient.get<ResponseObject>(`http://localhost:8080/validateEmpId/${empId}`);

  }
 
  

 


}
