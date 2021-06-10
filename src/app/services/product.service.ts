import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Product} from '../models/product.model';
import {environment} from '../../environments/environment.prod';
import * as moment from 'moment';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(): Product[] {
    return [
      {
        productCode: '00001',
        name: 'PS4 Pro Console 1TB',
        price: 13000,
        description: 'An awesome console',
        dateAdded: Date.now(),
        imageUrl: 'https://media.takealot.com/covers_tsins/45345716/ps4proooo-zoom.jpg'
      },
      {
        productCode: '00002',
        name: 'PS3 Console 1TB',
        price: 10500,
        description: 'An awesome console',
        dateAdded: Date.now(),
        imageUrl: 'https://media.takealot.com/covers_tsins/45345716/ps4proooo-zoom.jpg'
      },
      {
        productCode: '00003',
        name: 'XBox 3',
        price: 8500,
        description: 'An awesome console',
        dateAdded: Date.now(),
        imageUrl: 'https://media.takealot.com/covers_tsins/45345716/ps4proooo-zoom.jpg'
      },
      {
        productCode: '00004',
        name: 'Nintendo WII',
        price: 6500,
        description: 'An awesome console',
        dateAdded: Date.now(),
        imageUrl: 'https://media.takealot.com/covers_tsins/45345716/ps4proooo-zoom.jpg'
      },
      {
        productCode: '00005',
        name: 'XBox 360',
        price: 4500,
        description: 'Actual XBox',
        dateAdded: Date.now(),
        imageUrl: 'https://media.takealot.com/covers_tsins/59233494/889842308129-zoom.jpg'
      },
      {
        productCode: '10237 - Tesla Model 3',
        name: 'XBox 360 D600',
        price: 675000,
        description: 'Actual XBox',
        dateAdded: Date.now(),
        imageUrl: 'https://media.takealot.com/covers_tsins/59233494/889842308129-zoom.jpg'
      },
    ];
  }

  initiatePayment(product: Product) {
    /**
     * PAYGATE will only consider the NOTIFY_URL if its a remote and valid POST URL
     * 12-06-2021 The RETURN_URL now also needs to be a valid remote url :(
     */
    const payment = {
      PAYGATE_ID: environment.PAYGATEID,
      REFERENCE: `#${product.productCode}`,
      AMOUNT: (product.price * 100).toString(),
      CURRENCY: 'ZAR',
      RETURN_URL: 'https://your-website.com/payment/result',
      TRANSACTION_DATE: moment().format('YYYY MM DD hh:mm:ss'),
      LOCALE: 'en-za',
      COUNTRY: 'ZAF',
      EMAIL: 'martian@test.com',
      NOTIFY_URL: 'https://your-website.com/payment/complete',
    };
    // @ts-ignore
    const checksumFormat = `${payment.PAYGATE_ID}${payment.REFERENCE}${payment.AMOUNT}${payment.CURRENCY}${payment.RETURN_URL}` +
      `${payment.TRANSACTION_DATE}${payment.LOCALE}${payment.COUNTRY}${payment.EMAIL}${payment.NOTIFY_URL}${environment.PAYGATEKEY}`;
    (payment as any).CHECKSUM = CryptoJS.MD5(checksumFormat, environment.PAYGATEKEY).toString();
    // @ts-ignore
    const body = new HttpParams({fromObject: payment });
    return this.http.post('https://secure.paygate.co.za/payweb3/initiate.trans', body, {
      responseType: 'text'
    });
  }
}
