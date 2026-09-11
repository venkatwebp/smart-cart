import { selectCartItemCount, selectCartItems } from "./cart.selectors"
import { Product } from "../../core/models/product.model"
import { cartReducer, CartState } from "./cart.reducer";


describe('Cart Selectors', () => {
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

    it('should select cart items', () => {
        const mockState: CartState = {
            items: [
                {
                    product: mockProduct,
                    quantity: 2
                }
            ]
        };

        const result =  selectCartItems.projector(mockState);
        
        expect(result.length).toBe(1);
        expect(result[0].product).toEqual(mockProduct);
        expect(result[0].quantity).toBe(2);
    });

    it('should select with two products', () => {
        const mockState: CartState = {
            items: [
                {
                    product: mockProduct,
                    quantity: 2
                },
                {
                    product: anotherProduct,
                    quantity: 3
                }
            ]
        };

        const result = selectCartItems.projector(mockState);
        expect(result.length).toBe(2);
    });

    it('should select cart items with empty array', () => {
        const mockState: CartState = {
            items: []
        };
        const result = selectCartItems.projector(mockState);
        expect(result.length).toBe(0)
    });

    it('should select cart items count', ()=> {
        const mockState: CartState = {
            items: [
                {
                    product: mockProduct,
                    quantity: 2
                },
                {
                    product: anotherProduct,
                    quantity: 3
                }
            ]
        };
        const result = selectCartItemCount.projector(mockState.items);
        expect(result).toBe(5)
    })
})

