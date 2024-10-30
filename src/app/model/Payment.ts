
export interface Customer1 {
    customerId: string;
    customerName: string;
    email: string;
    mobileNumber: string;
  }
  
  export interface Bill { 
   
    customer: Customer1;
    unitConsumption: number;
    billingStartDate: Date|null;
    billingEndDate: Date|null;
    billDueDate: Date|null;
    amountDue: number;
    status:String;
    billStatus:String;
    billId:number;
  }
  
  export interface Payment{
    bill:Bill;
    paymentDate:Date
    amountPaid: number 
    paymentMethod:String
    paymentStatus:String
    discount:number
    
  }
  export interface Paymenthistory{
    customer:Customer1;
    bill:Bill;
    paymentId:number;
    discount:number;
    paymentDate:Date;
    paymentMethod:String,
    paymentStatus:String;
    amount:number;
    netAmount:number;
  }