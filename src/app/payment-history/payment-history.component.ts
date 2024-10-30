import { Component, OnInit } from '@angular/core';
import { Paymenthistory } from '../model/Payment';
import { PaymenthistoryService } from '../services/paymenthistory.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PaymentserviceService } from '../services/paymentservice.service';

@Component({
  selector: 'app-payment-history',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.css'],
})
export class PaymentHistoryComponent implements OnInit {
  currentPage: number = 1;
  itemsPerPage: number = 7;
  totalPages: number = 0;

  PaginatedDetails: Paymenthistory[] = [];
  Details: Paymenthistory[] = [];
  filteredDetails: Paymenthistory[] = [];

 
  searchTerm: string = '';
  showSpinner:boolean=false
  constructor(private paymenthistoryservice: PaymenthistoryService, private router: Router,private paymentservice:PaymentserviceService) {}

  ngOnInit(): void {
    this.getAllPayment();
  }

  getAllPayment() {
    this.showSpinner=true;
    this.paymenthistoryservice.getAllPayment().subscribe({
      next: (payments) => {
        this.showSpinner=false;
        this.Details = payments;
        this.filteredDetails = this.Details; 
        this.paginateTransactions();
      },
      error: (error) => {
        console.error('Error fetching payment history', error);
      },
      complete: () => {
        this.totalPages = Math.ceil(this.Details.length / this.itemsPerPage);
      },
    });
  }

  paginateTransactions(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.PaginatedDetails = this.filteredDetails.slice(startIndex, endIndex);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateTransactions();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateTransactions();
    }
  }


  search(): void {
   
    this.filteredDetails = this.Details.filter((transaction) =>
      transaction.bill.customer.customerName.toLowerCase().includes(this.searchTerm) ||
      transaction.paymentId.toString().includes(this.searchTerm) ||
      transaction.paymentMethod.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      transaction.paymentStatus.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      transaction.amount.toString().includes(this.searchTerm) ||
      transaction.discount.toString().includes(this.searchTerm) ||
      transaction.netAmount.toString().includes(this.searchTerm)
    );

  
    this.totalPages = Math.ceil(this.filteredDetails.length / this.itemsPerPage);
    this.currentPage = 1; 
    this.paginateTransactions();
  }

  todashboard() {
    this.router.navigate(['/dashboard']);
  }


  generateInvoice(index:number) {
   
   
    
    this.paymentservice.generateInvoice(this.PaginatedDetails[index].bill.billId).subscribe({
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
}
