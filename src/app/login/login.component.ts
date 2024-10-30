import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmpServiceService } from '../services/emp-service.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],    
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'

})
export class LoginComponent {
  constructor(private employeeservice:EmpServiceService, private router: Router){} 
  otpInputVisible: boolean = true;
 
  alertVisible:boolean=false;
  error:String=""
  isOtpButton:boolean=false;
  currentTime:any;
  otp:number|null=null;
  olderTime:any
  enteredOtp:any; 
  tempEmpId:any;
  empId:any;
  otpAlertColor:String="";
  otpAlertBorder:String="";
  alertIconColor:String=""
  alertTextColor:String=""


  loginValidation(form:any){
       
      if(form.controls['empId'].errors){
        if(form.controls['empId'].errors.required){
          this.alertVisible=true;
          this.error="* Requied.."
          
        }
        else if(form.controls['empId'].errors.pattern){
          this.alertVisible=true;
          this.error="* Invalid EmployeeID.."
          
        }
      }
      else{
           this.validEmpId();
           this.tempEmpId=this.empId;
      }

  }
  clearAlert(){
    this.error=""
    this.alertVisible=false
  }
  responseOtp:any
  validEmpId(){
         this.tempEmpId=this.empId;
         this.isOtpButton=true
          this.employeeservice.validEmpId(this.empId).subscribe({
             next:(response)=>{
              if (response.exists){
                 this.otpInputVisible=false;
                 
                  this.isOtpButton=true
                  this.alertVisible=true;
               
                  this.error="Otp Generated.Valid For 30Sec"
                  this.otpAlertColor="lightGreen";
                  this.otpAlertBorder="lightgreen";
                  this.alertIconColor="green"
                  this.alertTextColor="green"
                  this.responseOtp=response.otp
                  setTimeout(()=>{
                       this.isOtpButton=false;
                       this.responseOtp=null;
                        },30000);
                
               }else{
              
                 this.alertVisible=true;
                 this.otpAlertColor="";
                 this.otpAlertBorder="";
                  this.alertIconColor=""
                  this.alertTextColor=""
                 this.error="Employee Id Doesn't Exist"
                 this.isOtpButton=false
               }
             },
             error:(error) => {
              
               console.error('Error validating employee ID', error);
             }
  
           })
     }


     otpValidate(){
           if((this.enteredOtp===this.responseOtp )&& (this.empId===this.tempEmpId)){
               this.router.navigate(['/dashboard']);
           }
           else if(this.empId!=this.tempEmpId){
              this.alertVisible=true;
              this.otpAlertColor="";
              this. otpAlertBorder="";
              this.alertIconColor=""
              this.alertTextColor=""
              this.error="*OTP Doesnot Match";
           }else{
            this.alertVisible=true;
            this.otpAlertColor="";
            this.otpAlertBorder="";
            this.alertIconColor=""
            this.alertTextColor=""
            this.error="*Invalid OTP"
           }
     }




}





