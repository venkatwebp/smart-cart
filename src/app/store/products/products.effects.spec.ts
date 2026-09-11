import { ProductService } from '../../core/services/product.service';
import { ProductsEffects } from './products.effects';
import { Product } from '../../core/models/product.model';
import { Actions } from '@ngrx/effects';
import { of, Subject, throwError } from 'rxjs';
import { loadProducts, loadProductsFailure, loadProductsSuccess } from './products.actions';



describe('Product Effects', () => {
    let effects: ProductsEffects;
    let productService: jasmine.SpyObj<ProductService>;
    let actions$: Subject<any>;
    
    const mockProducts: Product[] = [
        {
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
    },
    {
        id: 2,
        title: 'Another Product',
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
];


beforeEach(() => {
    productService = jasmine.createSpyObj('ProductService', ['getProducts']);
    actions$ = new Subject<any>();
    effects = new ProductsEffects(
        actions$ as Actions,
        productService
    );
})

it('should dispatch loadProductsSuccess when products are loaded successfully', () => {
    productService.getProducts.and.returnValue(of(mockProducts));

    effects.loadProducts$.subscribe(result => {
        expect(result).toEqual(
            loadProductsSuccess({
                products: mockProducts
            })
        )
    });
    actions$.next(loadProducts());
});

it('should dispatch loadProductsFailure when loading products fails', () => {
    productService.getProducts.and.returnValue(
        throwError(() => 'Something went wrong')
    );
    effects.loadProducts$.subscribe(result => {
        expect(result).toEqual(
            loadProductsFailure({
                error: 'Something went wrong'
            })
        )
    });
    actions$.next(loadProducts());
})


})