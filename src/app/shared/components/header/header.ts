import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCartItemCOunt } from '../../../store/cart/cart.selectors';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink, 
    RouterLinkActive,
    AsyncPipe
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  cartItemCount$: Observable<number>;

  constructor(private store: Store){
    this.cartItemCount$ = this.store.select(selectCartItemCOunt)
  }
}
