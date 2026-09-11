import { Product } from "../../core/models/product.model"
import { selectIsProductInWishlist, selectWishlistCount, selectWishlistItems } from "./wishlist.selectors";
import { WishlistState } from "./wishlist.state";



describe('Wishlist Selectors', ()=> {

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

    it('should select wish list items', () => {
        const mockState: WishlistState = {
            items: [
               mockProduct
            ]
        };
        const result = selectWishlistItems.projector(mockState);
        expect(result.length).toBe(1);
        expect(result[0]).toEqual(mockProduct);
    });

    it('should select multiple wishlist items', () => {
        const mockState: WishlistState = {
            items:[
                mockProduct,
                anotherProduct
            ]
        };
        const result = selectWishlistItems.projector(mockState);
        expect(result[0]).toEqual(mockProduct);
        expect(result[1]).toEqual(anotherProduct);
    });

    it('should select empty wishlist', () => {
        const mockState: WishlistState = {
            items: []
        };
        const result = selectWishlistItems.projector(mockState);
        expect(result.length).toBe(0);
    });

    it('should select wishlist count', () => {
        const mockState: WishlistState = {
            items: [mockProduct, anotherProduct]
        };
        const result = selectWishlistCount.projector(mockState.items);
        expect(result).toBe(2)
    });
    it('should select empty wishlist count', ()=> {
        const mockState: WishlistState = {
            items: []
        };
        const result = selectWishlistCount.projector(mockState.items);
        expect(result).toBe(0);
    });

    it('should return true when product exists in wishlist', () => {
        const mockState: WishlistState = {
            items: [mockProduct, anotherProduct]
        }
         const result = selectIsProductInWishlist(mockProduct.id).projector(mockState.items);
         expect(result).toBeTrue();
    })

    it('should return false when product id does not exist', () => {
        const mockState: WishlistState = {
            items: [mockProduct, anotherProduct]
        };
        const result = selectIsProductInWishlist(99).projector(mockState.items);
        expect(result).toBeFalse();
    });

    it('should select Is Product In Wishlist with empty wishlist', () => {
        const mockState: WishlistState = {
            items: []
        };
        const result = selectIsProductInWishlist(mockProduct.id).projector(mockState.items);
        expect(result).toBeFalse();
    });
})