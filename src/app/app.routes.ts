import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => 
           import('./features/home/home').then(m => m.Home)
    },
    {
        path: 'products',
        loadComponent: () =>  
            import('./features/products/products').then(m => m.Products)
    },
    {
        path: 'products/:id',
        loadComponent: () => 
            import('./features/product-details/product-details').then(m => m.ProductDetails)
        
    },
    {
        path: 'cart',
        loadComponent: () => 
            import('./features/cart/cart').then(m => m.Cart)
    }
];
