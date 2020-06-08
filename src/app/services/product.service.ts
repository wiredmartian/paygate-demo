import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Product} from '../models/product.model';
import {environment} from '../../environments/environment.prod';
import * as crypto from 'crypto';

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
        productCode: '00006',
        name: 'XBox 360 D600',
        price: 6000,
        description: 'Actual XBox',
        dateAdded: Date.now(),
        imageUrl: 'https://media.takealot.com/covers_tsins/59233494/889842308129-zoom.jpg'
      },
    ];
  }

  initiatePayment(product: Product) {
    const payment = {
      PAYGATE_ID: environment.PAYGATEID,
      REFERENCE: product.name,
      AMOUNT: (product.price * 100).toString(),
      CURRENCY: 'ZAR',
      RETURN_URL: 'http://localhost:4200',
      LOCALE: 'en-za',
      COUNTRY: 'ZAF',
      TRANSACTION_DATE: Date.now(),
      EMAIL: 'solomzi.jikani@gmail.com'
    };
    const checksum = crypto.createHash('md5').update(payment).digest('hex');
    (payment as any).CHECKSUM = checksum;
    const request = encodeURIComponent(JSON.stringify(payment));
    return this.http.post('https://secure.paygate.co.za/payweb3/initiate.trans', request,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
  }
}
