import { Component, OnInit } from '@angular/core';
import {Product} from '../models/product.model';
import {ProductService} from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  protected productList: Product[];
  constructor(private productSvc: ProductService) { }

  ngOnInit(): void {
    this.productList = this.productSvc.getProducts();
  }
}
