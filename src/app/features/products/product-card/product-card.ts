import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Product } from '../../../core/models/product.model';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { addToCart } from '../../../store/cart/cart.actions';
import { toggleWishlist } from '../../../store/wishlist/wishlist.actions'; 
import { Observable } from 'rxjs';
import { selectIsProductInWishlist } from '../../../store/wishlist/wishlist.selectors';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard implements OnChanges{
  @Input() product!: Product;
  isWishlisted$!: Observable<boolean>;
  static product: Product;

  constructor(private store: Store){}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['product'] && this.product){
      this.isWishlisted$ = this.store.select(
        selectIsProductInWishlist(this.product.id)
      )
    }
  }

  addToCart(product: Product, quantity: number){
    this.store.dispatch(
      addToCart({ product, quantity })
    )
  }

  toggleWishlist(product: Product){
    this.store.dispatch(
      toggleWishlist({product})
    )
  }
}
