import { Component, OnInit } from '@angular/core';
import { ProductCard } from './product-card/product-card';
import { CommonModule } from '@angular/common';
import { Product } from '../../core/models/product.model';
import { combineLatest, map, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadProducts } from '../../store/products/products.actions';
import { productList } from '../../store/products/products.selectors';
import { loadingState } from '../../store/products/products.selectors';
import { errorState } from '../../store/products/products.selectors';

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
export class Products implements OnInit{
  products$: Observable<Product[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(
    private route: ActivatedRoute,
    private store: Store
  ){
    this.products$ = combineLatest([
      this.store.select(productList),
      this.route.queryParams
    ]).pipe(
      map(([products, params]) => 
        this.searchProducts(products, params['search'] ?? '')
      )
    );
    this.loading$ = this.store.select(loadingState);
    this.error$ = this.store.select(errorState);
  }

  ngOnInit(){
    this.store.dispatch(loadProducts());
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
