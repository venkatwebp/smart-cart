import { Product } from "../../core/models/product.model"
import { addToCart, clearCart, removeFromCart, updateQuantity } from "./cart.actions";
import { cartReducer, CartState } from "./cart.reducer";


describe('Cart Reducer', () => {

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

    const anotherProduct: Product = {
        ...mockProduct,
        id: 2,
        title: 'Another Product'
    }

    it('should add new product to the cart', () => {
        const initialState: CartState = {
            items: []
        }

        const action = addToCart({
            product: mockProduct,
            quantity: 2
        })

        const newState = cartReducer(initialState, action);
        expect(newState.items.length).toBe(1);
        expect(newState.items[0].product).toBe(mockProduct);
        expect(newState.items[0].quantity).toBe(2);
    });

    it('should increase quantity when adding an existing product', ()=> {
        const initialState: CartState = {
            items: [
                {
                    product: mockProduct,
                    quantity: 2
                }
            ]
        };

        const action = addToCart({
            product: mockProduct,
            quantity: 3
        })

        const newState = cartReducer(initialState, action);

        expect(newState.items.length).toBe(1);
        expect(newState.items[0].quantity).toBe(5);
    });

    it('should remove a product from the cart', () => {
        const initialState: CartState = {
            items: [
                {
                    product: mockProduct,
                    quantity: 2
                }
            ]
        };

        const action = removeFromCart({
            productId: mockProduct.id
        });

        const newState = cartReducer(initialState, action);
        expect(newState.items.length).toBe(0);
    });

    it('should remove the only selected product', () => {
        const initialState: CartState = {
            items: [
                {
                    product: mockProduct,
                    quantity: 2
                },
                {
                    product: anotherProduct,
                    quantity: 1
                }
            ]
        };
        const action = removeFromCart({
            productId: mockProduct.id
        });

        const newState = cartReducer(initialState, action);

        expect(newState.items.length).toBe(1);
        expect(newState.items[0].product).toBe(anotherProduct);
    });

    it('should update product quantity', () => {
        const initialState: CartState = {
            items: [
                {
                    product: mockProduct,
                    quantity: 2
                }
            ]
        }

        const action = updateQuantity({
            productId: mockProduct.id,
            quantity: 5
        });

        const newState = cartReducer(initialState, action);
        expect(newState.items[0].quantity).toBe(5);
    });

    it('should not change quantity when product does not exist', () => {
        const initialState: CartState = {
            items: [
                {
                    product: mockProduct,
                    quantity: 2
                }
            ]
        };

        const action = updateQuantity({
            productId: 999,
            quantity: 10
        })

        const newState = cartReducer(initialState, action);
        expect(newState.items.length).toBe(1);
        expect(newState.items[0].quantity).toBe(2)
    });

    it('should clear the cart', () => {
        const initialState: CartState = {
            items: [
                {
                    product: mockProduct,
                    quantity: 2
                },
                {
                    product: anotherProduct,
                    quantity: 1
                }
            ]
        };
        const action = clearCart();

        const newState = cartReducer(initialState, action);
        expect(newState.items.length).toBe(0);
    })
    
})