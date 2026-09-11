import { Product } from "../../core/models/product.model"
import { loadProducts, loadProductsFailure, loadProductsSuccess } from "./products.actions";
import { ProductState } from "./products.state";
import { productReducer } from "./products.reducer";



describe('Products Reducer', () => {

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
    };

    const anotherProduct: Product = {
        ...mockProduct,
        id: 2,
        title: 'Another Product'
    };

    const mockProducts: Product[] = [
        mockProduct,
        anotherProduct
    ];

    it('should set loading to true when loading products', () => {
        const initialState: ProductState = {
            items: [],
            loading: false,
            error: null
        };
        const action = loadProducts();
        const newState = productReducer(initialState, action);
        expect(newState.loading).toBeTrue();
        expect(newState.error).toBeNull();
    });

    it('should store products when loading succeeds', () => {
        const initialstate: ProductState = {
            items: [],
            loading: true,
            error: null
        };
        const action = loadProductsSuccess({
            products: mockProducts
        });
        const newState = productReducer(initialstate, action);
        expect(newState.items).toEqual(mockProducts);
        expect(newState.items.length).toBe(2);
    });

    it('should set loading to false after successful loading', ()=> {
        const initialState: ProductState = {
            items: [],
            loading: true,
            error: null
        };
        const action = loadProductsSuccess({
            products: mockProducts
        });
        const newState = productReducer(initialState, action);
        expect(newState.loading).toBeFalse();
        expect(newState.error).toBeNull();
    });

    it('should store error when loading fails', ()=> {
        const initialState: ProductState = {
            items: [],
            loading: true,
            error: null
        };
        const action = loadProductsFailure({
            error: 'Failed to load products'
        });
        const newState = productReducer(initialState, action);
        expect(newState.error).toBe('Failed to load products');
    });

    it('should set loading to false when loading fails', () => {
        const initialState: ProductState = {
            items: [],
            loading: true,
            error: null
        }
        const action = loadProductsFailure({
            error: 'Failed to load products'
        });
        const newState = productReducer(initialState, action);
        expect(newState.loading).toBeFalse();
    });

    it('should keep existing products when loading fails', () => {
        const initialState: ProductState = {
            items: [
                mockProduct,
                anotherProduct
            ],
            loading: true,
            error: null
        };
        const action = loadProductsFailure({
            error: 'Something went wrong'
        });
        const newState = productReducer(initialState, action);
        expect(newState.items).toEqual([
            mockProduct,
            anotherProduct
        ]);
        expect(newState.loading).toBe(false);
        expect(newState.error).toBe('Something went wrong');
    });

    it('should return the initial state for an unknown action', () => {
        //arrange
        const initialState: ProductState = {
            items: [],
            loading: true,
            error: null
        };
        const action = {type: 'UNKNOWN_ACTION'};
        //act
        const newState = productReducer(initialState, action);
        //assert
        expect(newState).toEqual(initialState);
    })
})
