import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductsComponent} from './products/products.component';
import {PaymentCompleteComponent} from "./payment-complete/payment-complete.component";


const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  { path: 'payment/complete', component: PaymentCompleteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
