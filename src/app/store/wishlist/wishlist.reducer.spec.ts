import { Product } from "../../core/models/product.model"
import { addToWishlist, clearWishlist, removeFromWishlist, toggleWishlist } from "./wishlist.actions"
import { wishlistReducer } from "./wishlist.reducer"
import { WishlistState } from "./wishlist.state"


describe('Wishlist Reducer', () => {
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

    it('should add another product without removing existing products', () => {
        const initialState: WishlistState = {
            items: [mockProduct]
        }
        const action = addToWishlist({
            product: anotherProduct
        });
        const newState = wishlistReducer(initialState, action);
        expect(newState.items.length).toBe(2);
        expect(newState.items[0]).toEqual(mockProduct)
    })

    it('should not add duplicate product', () => {
        const initialState: WishlistState = {
            items: [mockProduct]
        }

        const action = addToWishlist({
            product: mockProduct
        })
        const newState = wishlistReducer(initialState, action);
        expect(newState.items.length).toBe(1);
        expect(newState.items[0]).toEqual(mockProduct);
    })

    it('should add another product', () => {
        const initialState: WishlistState = {
            items: []
        }
        const action = addToWishlist({
            product: anotherProduct
        })
        const newState = wishlistReducer(initialState, action);
        expect(newState.items.length).toBe(1);
        expect(newState.items[0]).toEqual(anotherProduct)
    });

    it('should remove a product', () => {
        const initialState: WishlistState = {
            items: [
                mockProduct,
                anotherProduct
            ]
        };
        const action = removeFromWishlist({
            productId: mockProduct.id
        });
        const newState = wishlistReducer(initialState, action);
        expect(newState.items.length).toBe(1);
        expect(newState.items[0]).toEqual(anotherProduct);
    });
    
    it('should not change wishlist when removing non-existing product', () => {
        const initialState: WishlistState = {
            items: [
                mockProduct,
                anotherProduct
            ]
        };
        const action = removeFromWishlist({
            productId: 1
        });
        const newState = wishlistReducer(initialState, action);
        expect(newState.items.length).toBe(1);
    });

    it('should toggle and add product', () => {
        const initialState: WishlistState = {
            items: []
        };
        const action = toggleWishlist({
            product: mockProduct
        });
        const newState = wishlistReducer(initialState, action);
        expect(newState.items.length).toBe(1);
    });

    it('should toggle and remove product', () => {
        const initialState: WishlistState = {
            items: [
                mockProduct,
                anotherProduct
            ]
        };
        const action = toggleWishlist({
            product: mockProduct
        });
        const newState = wishlistReducer(initialState, action);
        expect(newState.items.length).toBe(1);
        expect(newState.items[0]).toEqual(anotherProduct);
    });

    it('should clear the wishlist', () => {
        const initialState: WishlistState = {
            items: [
                mockProduct,
                anotherProduct
            ]
        };
        const action = clearWishlist();
        const newState = wishlistReducer(initialState, action);
        expect(newState.items.length).toBe(0);
    })
})