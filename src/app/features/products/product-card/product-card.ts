import { Component, Input } from '@angular/core';
import { Product } from '../../../core/models/product.model';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCartItemCOunt } from '../../../store/cart/cart.selectors';
import { addToCart } from '../../../store/cart/cart.actions';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  @Input() product!: Product;

  constructor(private store: Store){

  }

  addToCart(product: Product, quantity: number){
    this.store.dispatch(
      addToCart({ product, quantity })
    )
  }
}
