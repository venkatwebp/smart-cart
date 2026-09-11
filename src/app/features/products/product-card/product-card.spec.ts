import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCard } from './product-card';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { cartReducer } from '../../../store/cart/cart.reducer';
import { wishlistReducer } from '../../../store/wishlist/wishlist.reducer';
import { Product } from '../../../core/models/product.model';

describe('ProductCard', () => {
  
  const mockProduct: Product = {
    id: 1,
    title: 'Test Product',
    description: 'Test product description',
    price: 999,
    category: 'Electronics',
    brand: 'Test Brand',
    rating: 4.5,
    reviewCount: 10,
    inStock: true,
    stockQuantity: 20,
    image: 'test-image.jpg',
    discountPercentage: 10,
    tags: ['test', 'electronics']
  }
  
  let fixture: ComponentFixture<ProductCard>;
  let component: ProductCard;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCard],
      providers: [
        provideRouter([]),
        provideStore({
          cart: cartReducer,
          wishlist: wishlistReducer
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCard);
    component = fixture.componentInstance;
    component.product = mockProduct;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
