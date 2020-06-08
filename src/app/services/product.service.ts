import {Injectable} from '@angular/core';
import {Product} from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

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
      }
    ];
  }
}
