import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cart } from './cart';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { cartReducer } from '../../store/cart/cart.reducer';
import { wishlistReducer} from '../../store/wishlist/wishlist.reducer'

describe('Cart', () => {
  let component: Cart;
  let fixture: ComponentFixture<Cart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cart],
      providers: [
        provideRouter([]),
        provideStore({
          cart: cartReducer,
          wishlist: wishlistReducer
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Cart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
