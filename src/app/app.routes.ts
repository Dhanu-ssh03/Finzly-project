import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import path from 'path';
import { LoginComponent } from './login/login.component';
import { CustomerdataComponent } from './customerdata/customerdata.component';

import { Server } from 'http';
import { PaymentComponent } from './payment/payment.component';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    {path:"login",component:LoginComponent},
    {path:"customer",component:CustomerdataComponent},
    {path:"payment",component:PaymentComponent},
    {path:"paymenthistory",component:PaymentHistoryComponent},
    {path:"dashboard",component:DashboardComponent}
];
