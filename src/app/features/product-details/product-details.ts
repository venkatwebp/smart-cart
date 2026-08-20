import { Component } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Observable, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { addToCart } from '../../store/cart/cart.actions';
 
@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe
  ],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails {
  product$: Observable<Product | undefined>;
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private store: Store
  ){
      this.product$ = this.route.paramMap.pipe(
        switchMap(params => {
          const id = Number(params.get('id'));
          console.log('Product Id', id);

          return this.productService.getProductById(id);
        })
      )
    }

  addToCart(product: Product, quantity: number){
    this.store.dispatch(
      addToCart({ product, quantity })
    )
  }

  increaseQuantity(maxQuantity: number){
    if(this.quantity < maxQuantity){
      this.quantity++;
    }
  }

  decreaseQuantity(){
    if(this.quantity > 1){
      this.quantity--;
    }
  }
}
