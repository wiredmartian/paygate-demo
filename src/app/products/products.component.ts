import { Component, OnInit } from '@angular/core';
import {Product} from '../models/product.model';
import {ProductService} from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public productList: Product[];
  constructor(private productSvc: ProductService) { }

  ngOnInit(): void {
    this.productList = this.productSvc.getProducts();
  }
  init(p: Product, e: any) {
    console.log(e)
    e.target.innerHTML = "Buy...";
    this.productSvc.initiatePayment(p)
      .subscribe((res) => {
        const data = res.toString().split('&');
        /**
         * [ "PAYGATE_ID=10011072130", "PAY_REQUEST_ID=4ED21801-2B70-0F8B-0201-B7477A129461", * "REFERENCE=209230",
         * "CHECKSUM=46290b892c7a8daea80deb1088604f08" ]
         * */
        const PAY_REQUEST_ID = data[1].substr(data[1].indexOf('=') + 1);
        const REFERENCE = data[2].substr(data[2].indexOf('=') + 1);
        const CHECKSUM = data[3].substr(data[3].indexOf('=') + 1);

        this.createPaymentForm(PAY_REQUEST_ID, CHECKSUM);
      }, error => {
        console.log(error);
      });
  }

  createPaymentForm(payId: string, checksum: string) {
    /**
     *  <form action="https://secure.paygate.co.za/payweb3/process.trans" method="POST">
     <input id="PAY_REQUEST_ID" name="PAY_REQUEST_ID" type="hidden" />
     <input id="CHECKSUM" name="CHECKSUM" type="hidden" />
     <input id="REDIRECT" type="submit" />
     </form>
     * */
    let form = document.createElement('form');
    form.action = 'https://secure.paygate.co.za/payweb3/process.trans';
    form.method = 'POST';
    let payRequestInput = document.createElement('input');
    let checkSumInput = document.createElement('input');
    let submit = document.createElement('button');

    payRequestInput.name = 'PAY_REQUEST_ID';
    payRequestInput.id = 'PAY_REQUEST_ID';
    payRequestInput.type = 'text';
    payRequestInput.hidden = true;
    payRequestInput.value = payId;

    checkSumInput.name = 'CHECKSUM';
    checkSumInput.id = 'CHECKSUM';
    checkSumInput.type = 'text';
    checkSumInput.hidden = true;
    checkSumInput.value = checksum;

    submit.type = 'submit';
    form.append(payRequestInput);
    form.append(checkSumInput);
    form.append(submit);
    document.body.appendChild(form);
    submit.click();
  }
}
