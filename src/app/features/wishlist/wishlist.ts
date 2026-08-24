import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../core/models/product.model';
import { Store } from '@ngrx/store';
import { selectWishlistItems } from '../../store/wishlist/wishlist.selector';
import { CommonModule } from '@angular/common';
import { ProductCard } from '../products/product-card/product-card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  imports: [
    CommonModule,
    ProductCard,
    RouterLink
  ],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.scss',
})
export class Wishlist {
  wishlistItems$: Observable<Product[]>;

  constructor(private store: Store){
    this.wishlistItems$ = this.store.select(selectWishlistItems)
  }


}
