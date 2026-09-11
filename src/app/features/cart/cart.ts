import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartItem } from '../../core/models/cart-item.model';
import { selectCartItemCount, selectCartItems } from '../../store/cart/cart.selectors';
import { RouterLink } from '@angular/router';
import { decreaseQuantity, increaseQuantity, removeFromCart } from '../../store/cart/cart.actions';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  cartItems$: Observable<CartItem[]>;
  cartItemCount$: Observable<number>;

  constructor(private store: Store){
   this.cartItems$ =  this.store.select(selectCartItems);
   this.cartItemCount$ = this.store.select(selectCartItemCount)
  }

  increaseQuantity(item: CartItem){
    this.store.dispatch(increaseQuantity({
      productId: item.product.id
    }))
  }

  decreaseQuantity(item: CartItem){
    this.store.dispatch(decreaseQuantity({
      productId: item.product.id
    }))
  }

  removeItem(item: CartItem){
    this.store.dispatch(removeFromCart({
      productId: item.product.id
    }))
  }

}
