import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartItem } from '../../core/models/cart-item.model';
import { selectCartItems } from '../../store/cart/cart.selectors';
import { RouterLink } from '@angular/router';

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

  constructor(private store: Store){
   this.cartItems$ =  this.store.select(selectCartItems);
  }
}
