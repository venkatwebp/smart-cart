import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Products } from './products';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { cartReducer } from '../../store/cart/cart.reducer';
import { wishlistReducer } from '../../store/wishlist/wishlist.reducer';
import { productReducer } from '../../store/products/products.reducer';

describe('Products', () => {
  let component: Products;
  let fixture: ComponentFixture<Products>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Products],
      providers: [
        provideRouter([]),
        provideStore({
          cart: cartReducer,
          wishlist: wishlistReducer,
          product: productReducer
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Products);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
