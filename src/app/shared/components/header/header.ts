import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Observable, of, switchMap } from 'rxjs';
import { selectCartItemCOunt } from '../../../store/cart/cart.selectors';
import { selectWishlistCount } from '../../../store/wishlist/wishlist.selector';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink, 
    RouterLinkActive,
    AsyncPipe,
    FormsModule
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  cartItemCount$: Observable<number>;
  wishlistCount$: Observable<number>;
  searchTerm: string = '';

  constructor(
    private store: Store,
    private router: Router
  ){
    this.cartItemCount$ = this.store.select(selectCartItemCOunt);
    this.wishlistCount$ = this.store.select(selectWishlistCount);
  }

  searchProducts(){
    of(this.searchTerm.trim()).pipe(
      filter(term => term.length > 0),
      switchMap(term => 
        this.router.navigate(['/products'], {
          queryParams: { search : term }
        })
      )
    ).subscribe();
  }
}
