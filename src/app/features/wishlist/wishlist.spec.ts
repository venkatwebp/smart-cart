import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Wishlist } from './wishlist';
import { provideStore } from '@ngrx/store';
import { cartReducer } from '../../store/cart/cart.reducer';
import { wishlistReducer } from '../../store/wishlist/wishlist.reducer';
import { provideRouter } from '@angular/router';

describe('Wishlist', () => {
  let component: Wishlist;
  let fixture: ComponentFixture<Wishlist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Wishlist],
      providers: [
        provideRouter([]),
        provideStore({
          cart: cartReducer,
          wishlist: wishlistReducer
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Wishlist);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
