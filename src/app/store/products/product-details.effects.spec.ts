import { Actions } from "@ngrx/effects";
import { Product } from "../../core/models/product.model";
import { ProductService } from "../../core/services/product.service";
import { ProductDetailsEffects } from "../products/product-details.effects";
import { catchError, of, Subject, throwError } from "rxjs";
import { loadProductById, loadProductByIdFailure, loadProductByIdSuccess } from "./product-details.actions";


describe('Product Details Effects', () => {
    let effects: ProductDetailsEffects;
    let productService: jasmine.SpyObj<ProductService>;
    let actions$: Subject<any>;

    const mockProducts: Product[] = [{
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
        productService = jasmine.createSpyObj('ProductService', ['getProducts', 'getProductById']);
        actions$ = new Subject<any>();
        effects = new ProductDetailsEffects(
            actions$ as Actions,
            productService
        );
    });

    it('should dispatch loadProductByIdSuccess when product is loaded successfully', () => {
        productService.getProductById.and.returnValue(of(mockProducts[0]));
        effects.loadDetailsProducts$.subscribe(result =>
            expect(result).toEqual(
                loadProductByIdSuccess({
                    product: mockProducts[0]
                })
            )
        );
        actions$.next(loadProductById({ id: mockProducts[0].id }));
    });

    it('should dispatch loadProductByIdFailure when product is not found', () => {
        productService.getProductById.and.returnValue(of(undefined));
        effects.loadDetailsProducts$.subscribe(error =>
            expect(error).toEqual(
                loadProductByIdFailure({
                    error: 'Product not found'
                })
            )
        );
        actions$.next(loadProductById({ id: mockProducts[0].id }))
    });

    it('should dispatch loadProductByIdFailure when loading product fails', () => {
        productService.getProductById.and.returnValue(
            throwError(() => 'Something went wrong')
        );
        effects.loadDetailsProducts$.subscribe(error =>
            expect(error).toEqual(
                loadProductByIdFailure({
                    error: 'Something went wrong'
                })
            )
         );
        actions$.next(loadProductById({id: mockProducts[0].id}))
    })

})