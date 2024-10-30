import { Component } from '@angular/core';
import { PaymentserviceService } from '../services/paymentservice.service';
import { Bill } from '../model/Payment';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {


  constructor(private paymentservice:PaymentserviceService,private router:Router){}

  ngOnInit(): void {
    this.showLoader=true;
    this.fetchPaymentData()
  }
  

  payDisable:boolean=false
  searchTerm:string=""
  payButtonColor:String=""
  showLoader:boolean=false;
  paymentData:Bill[]=[]
  
  fetchPaymentData(){
        this.paymentservice.fetchPaymentData().subscribe({
          next:(response:Bill[])=>{
            this.showLoader=false;
            this.paymentData=response
          },
          error:(error)=>{
            this.showLoader=false;
            console.log(error)
          }
        })
  }
  get filteredPaymentData() {
    return this.paymentData.filter(bill => 
      (bill.customer.customerName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      bill.customer.customerId.toString().includes(this.searchTerm.toLowerCase())||
      bill.unitConsumption.toString().includes(this.searchTerm)||
      bill.amountDue.toString().includes(this.searchTerm) )
    );
  } 



  generateInvoice() {
    this.closeSuccessModal();
    this.paymentservice.generateInvoice(this.paymentData[this.index].billId).subscribe({
      next:(response: Blob) => {
        const url = window.URL.createObjectURL(response);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'invoice.pdf';
        link.click(); 
        window.URL.revokeObjectURL(url);
      },error: error => {
        console.error('Error generating invoice:', error);
      }
    })
  }
  savePayment(index:number){
       const billId:number=  this.paymentData[index].billId;
  

       this.paymentservice.savePayment(billId).subscribe({
        next:(response)=>{
          console.log("Savedpayment",response)
          this.fetchPaymentData()
        },
        error:(error)=>{
          console.log(error)
        }

       })
 

  }
  todashboard(){
    this.router.navigate(['/dashboard']);
    
  }

  pay(index:number){
      
       this.paymentData[index].billStatus="Paid"
       

       this.paymentservice.updatePayStatus(this.paymentData[index].billId).subscribe({
        next:(response)=>{
          console.log("Success",response)
        },
        error:(error)=>{
          console.log(error)
        }
 
       })
      

  }
  index:number=-1;
  payIndex(index:number){
     this.index=index;
     console.log(this.index)
  }

  
  showSpinnerLoader = false; 

 
  
  showSpinner() {
     this.pay(this.index) 
     this.savePayment(this.index);
    this.showSpinnerLoader = true;
    setTimeout(() => {
      this.showSpinnerLoader = false;
      this.showSuccessModal()
    }, 2000); 
  }
  showSuccessModalFlag: boolean = false; 
  
 

  showSuccessModal() {
    this.showSuccessModalFlag = true; // Show modal
  }

  closeSuccessModal() {
    this.showSuccessModalFlag = false; // Hide modal
  }


  invoiceMail(){
    this.closeSuccessModal();
          this.paymentservice.invoiceMail(this.paymentData[this.index].billId).subscribe({
            next:(response)=>{
              console.log("Success mail sended",response)
            },
            error:(error)=>{
              console.log(error)
            }





          })

          
  }
}




// generateInvoice(): void {
//   this.paymentservice.generateInvoice().subscribe({
//     next: (response: Blob) => {
//       // Create a URL for the PDF blob
//       const blob = new Blob([response], { type: 'application/pdf' });
//       const url = window.URL.createObjectURL(blob);

//       // Create a link element to download the PDF
//       const link = document.createElement('a');
//       link.href = url;
//       link.download = 'invoice.pdf';
//       link.click();

//       // Clean up the URL object
//       window.URL.revokeObjectURL(url);
//     },
//     error: (error) => {
//       console.error('Error generating invoice:', error);
//     }
//   });