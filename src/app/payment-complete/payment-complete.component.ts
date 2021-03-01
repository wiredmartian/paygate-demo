import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-payment-complete',
  templateUrl: './payment-complete.component.html',
  styleUrls: ['./payment-complete.component.scss']
})
export class PaymentCompleteComponent implements OnInit {
  PAY_REQUEST_ID: string;
  TRANSACTION_STATUS: number;
  CHECKSUM: string;
  PaymentStatus: string;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params)=> {
      this.PAY_REQUEST_ID = params['PAY_REQUEST_ID'];
      this.TRANSACTION_STATUS = params['TRANSACTION_STATUS'];
      this.CHECKSUM = params['CHECKSUM'];
      if (this.TRANSACTION_STATUS == TransactionStatus.Unprocessed) {
        this.PaymentStatus = `Unprocessed`;
      } else if (this.TRANSACTION_STATUS == TransactionStatus.Approved) {
        this.PaymentStatus = `Approved`;
      } else {
        this.PaymentStatus = `Declined`;
      }
    })
  }

}

export enum TransactionStatus {
  Unprocessed,
  Approved ,
  Declined ,

}
