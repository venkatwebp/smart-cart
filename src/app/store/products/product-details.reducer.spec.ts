import { Product } from "../../core/models/product.model";
import { loadProductById, loadProductByIdFailure, loadProductByIdSuccess } from "../products/product-details.actions"
import { ProductDetailsState } from "../products/product-details.state";
import { productDetailsReducer } from "../products/product-details.reducer";


describe('Product Details Reducer', () => {
    const mockData: Product = {
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

    it('should set loading to true when loading products details', () => {
        const initialState: ProductDetailsState = {
            product: null,
            loading: false,
            error: null
        }
        const action = loadProductById({ id: mockData.id});
        const newState = productDetailsReducer(initialState, action);
        expect(newState.loading).toBe(true);
        expect(newState.error).toBeNull();
    })

    it('should store product details loading success', ()=> {
        const initialState: ProductDetailsState = {
            product: null,
            loading: true,
            error: null
        };
        const action = loadProductByIdSuccess({product: mockData});
        const newState = productDetailsReducer(initialState, action);
        expect(newState.product).toEqual(mockData);
        expect(newState.loading).toBe(false);
        expect(newState.error).toBeNull()
    })

    it('should store product details loading failure', ()=> {
        const initialState: ProductDetailsState = {
            product: mockData,
            loading: true,
            error: null
        };
        const action = loadProductByIdFailure({error: 'Product not found'});
        const newState = productDetailsReducer(initialState, action);
        expect(newState.product).toEqual(mockData);
        expect(newState.loading).toBe(false);
        expect(newState.error).toEqual('Product not found');
    })




})