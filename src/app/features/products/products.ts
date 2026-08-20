import { Component, OnInit } from '@angular/core';
import { ProductCard } from './product-card/product-card';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    ProductCard
],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products{
  products$: Observable<Product[]>

  constructor(private productService: ProductService){
    this.products$ = this.productService.getProducts();
  }


}
