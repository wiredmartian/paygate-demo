import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import {ProductService} from './services/product.service';
import {HttpClientModule} from '@angular/common/http';
import { PaymentCompleteComponent } from './payment-complete/payment-complete.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    PaymentCompleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
