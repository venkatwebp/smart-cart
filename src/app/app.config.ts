import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { cartReducer } from './store/cart/cart.reducer';
import { wishlistReducer } from './store/wishlist/wishlist.reducer';
import { ProductsEffects } from './store/products/products.effects';
import { productReducer } from './store/products/products.reducer';
import { productDetailsReducer } from './store/products/product-details.reducer';
import { ProductDetailsEffects } from './store/products/product-details.effects';
import { CheckoutEffects } from './store/checkout/checkout.effects';
import { checkoutReducer } from './store/checkout/checkout.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({
      cart: cartReducer,
      wishlist: wishlistReducer,
      product: productReducer,
      productDetails: productDetailsReducer,
      checkout: checkoutReducer
    }),
    provideEffects(
      ProductsEffects,
      ProductDetailsEffects,
      CheckoutEffects
    )
  ]
};
