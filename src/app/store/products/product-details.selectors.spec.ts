import { Product } from "../../core/models/product.model"
import { selectProductDetailsState } from "./product-details.selectors";
import { ProductDetailsState } from "./product-details.state";



describe('Product Details Selector', () => {

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

    it('should select product details', ()=> {
        const mockState: ProductDetailsState = {
            product: mockProduct,
            loading: true,
            error: null
        };
        const result = selectProductDetailsState.projector(mockState);
        expect(result.product).toEqual(mockProduct);
        expect(result.loading).toBeTrue();
        expect(result.error).toBeNull();
    })
})




