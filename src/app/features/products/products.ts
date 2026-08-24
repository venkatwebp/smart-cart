import { Component, OnInit } from '@angular/core';
import { ProductCard } from './product-card/product-card';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';
import { map, Observable, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

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

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ){
    this.products$ = this.route.queryParams.pipe(
      map(params => params['search'] || ''),
      switchMap(searchTerm => 
        this.productService.getProducts().pipe(
          map(products => 
            this.searchProducts(products, searchTerm)
          )
        )
      )
    );
  }

  searchProducts(products: Product[], searchTerm: string): Product[]{
    const term = searchTerm.trim().toLowerCase();

    if (!term) {
      return products;
    }

    return products.filter(product =>
      product.title.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term) ||
      product.brand.toLowerCase().includes(term)
    );
  }


}
