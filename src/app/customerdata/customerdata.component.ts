import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, Validators } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CustomerserviceService } from '../services/customerservice.service';
import { Customer } from '../model/customer';
import * as Papa from 'papaparse';
import { Router } from '@angular/router';
import { response } from 'express';
import { error } from 'console';


@Component({
  selector: 'app-customerdata',
  standalone: true,
  imports: [FormsModule,CommonModule, MatTabsModule,MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,MatNativeDateModule],
  templateUrl: './customerdata.component.html',
  styleUrl: './customerdata.component.css'
})

export class CustomerdataComponent {
    constructor(private customerservice:CustomerserviceService,private router:Router){}

  customer:Customer={
    customerId:"",
    customerName:"",
    email:"",
    mobileNumber:"",
    billDueDate:"",
    billingEndDate:"",
    billingStartDate:"",
    unitConsumption:null,
    address:""
  }

  idError:String="";
  nameError:String="";
  customerIdError:String="";
  unitConsumptionError:String="";
  billingStartDateError:String="";
  billingEndDateError:String="";
  billDueDateError:String="";
  emailError:String="";
  mobileNumberError:String="";
  addressError:String="";
  showSpinner:boolean=false;
  error:string=""
  file:File|null=null;




  customerFormValidation(form:any){
   
    this.idError= form.controls['id'].errors ?form.controls['id'].errors.required? "*Required..." :
                  form.controls['id'].errors.pattern ? "*Invalid Customer Id" : "":"";

    this.nameError = form.controls['name'].errors ?form.controls['name'].errors.required? "*Required..." :
                     form.controls['name'].errors.pattern ? "*Name should have only letters and space" : "":"";
   
    this.unitConsumptionError=form.controls['unitConsumption'].errors ?form.controls['unitConsumption'].errors.required? "*Required..." :
                              form.controls['unitConsumption'].errors.pattern ? "*Invalid Unit" : "":"";
    
    this.mobileNumberError=form.controls['mobileNumber'].errors ?form.controls['mobileNumber'].errors.required? "*Required..." :
                           form.controls['mobileNumber'].errors.pattern ? "* Invalid MobileNumber" : "":"";
   
    this.emailError=form.controls['email'].errors ?form.controls['email'].errors.required? "*Required..." :
                    form.controls['email'].errors.pattern ? "* Invalid Email" : "":"";
    
    this.addressError=form.controls['address'].errors ?form.controls['address'].errors.required? "*Required..." :
                    form.controls['address'].errors.pattern ? "* Invalid Address" : "":"";



    this.billDueDateError=form.controls['billDueDate'].errors?form.controls['billDueDate'].errors.required? "*Required..." :"":"";
  
    this.billingEndDateError=form.controls['billingEndDate'].errors?form.controls['billingEndDate'].errors.required?"*Required...":"":"";
    

    const startDate = new Date(form.controls['billingStartDate'].value);
    const endDate = new Date(form.controls['billingEndDate'].value);
    const dueDate=new Date(form.controls['billDueDate'].value)
    
    if (form.controls['billingStartDate'].errors) {
      if (form.controls['billingStartDate'].errors.required) {
        this.billingStartDateError = "*Required...";
      }
    } else if (startDate >= endDate) {
      this.billingStartDateError = "*Start date must be less than the End Date";
    } else {
      this.billingStartDateError = ""; 
    }
    
    if(endDate>=dueDate){
      this.billDueDateError="*DueDate Must Be Greater Than the EndDate";
    }

    
    this.formSubmission();
   
  }


  formSubmission(){
    if(!this.idError&&!this.addressError&&!this.billDueDateError&&!this.billingEndDateError&&!this.billingStartDateError&&!this.customerIdError&&!this.nameError&&!this.unitConsumptionError&&!this.emailError&&!this.mobileNumberError){
      this.showSpinner=true
      this.customerservice.saveCustomer(this.customer).subscribe({
          next:(response)=>{
            this.showSpinner=false;
             console.log("Saved customer data..",response); 
             this.customer.customerId="",
             this.customer.customerName="",
             this.customer.email="",
             this.customer.mobileNumber="",
             this.customer.billDueDate="",
             this.customer.billingEndDate="",
             this.customer. billingStartDate="",
             this.customer.unitConsumption=null,
             this.customer.address=""
          },
          error:(error) => {
          console.error('Error saving customer', error.status);
          },

      })
    }
  }

 
  todashboard(){
    this.router.navigate(['dashboard']);
  }

  selectedFile(event: any) {
    const file = event.target.files[0];

    if (file) {
        const fileExtension = file.name.split('.').pop()?.toLowerCase();
        if (fileExtension !== 'csv') {
            this.error='Please upload a valid CSV file.';
            this.file = null; 

            return;
        }
        this.file = file; 
     
    }
  }

 uploadFile(){
  if(this.file){
    this.customerservice.uploadFile(this.file).subscribe({
      next: (response) => {
        this.error=response;
        console.log('Saved customer csv data:', response);
        setTimeout(()=>{
          this.error=""
        },2000);
      },
      error: (error) => {
        console.error('Error saving customer:', error);
      },
    });
 
  }

  
 }
  
}


