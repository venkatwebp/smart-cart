import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Header } from './header';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { cartReducer } from '../../../store/cart/cart.reducer';
import { wishlistReducer } from '../../../store/wishlist/wishlist.reducer';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [
        provideRouter([]),
        provideStore({
          cart: cartReducer,
          wishlist: wishlistReducer
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
