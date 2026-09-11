import { CheckoutState, Customer, ShippingAddress } from "./checkout.state";
import { selectCanPlaceOrder, selectCheckoutError, selectCheckoutItems, selectCheckoutLoading, selectCheckoutTotal, selectCustomer, selectMessage, selectOrderId, selectOrderSuccess, selectPaymentMethod, selectShippingAddress } from "./checkout.selectors";


describe('Checkout Selectors', () => {
    const mockCustomer: Customer = {
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        phone: '1234567890'
    };

    const mockShippingAddress: ShippingAddress = {
        address: "123 Test Street",
        city: "Hyderabad",
        state: "Telangana",
        postalCode: "500001"
    }

    const mockProduct1 = {
        id: 1,
        title: 'Product 1',
        description: 'Description for Product 1',
        price: 100,
        category: 'Category',
        brand: 'Brand',
        rating: 5,
        reviewCount: 10,
        inStock: true,
        stockQuantity: 1,
        image: 'product-1.jpg',
        discountPercentage: 0,
        tags: ['tag1', 'tag2']
    };

    const mockProduct2 = {
        id: 2,
        title: 'Product 2',
        description: 'Description for Product 2',
        price: 200,
        category: 'Category',
        brand: 'Brand',
        rating: 5,
        reviewCount: 10,
        inStock: true,
        stockQuantity: 1,
        image: 'product-2.jpg',
        discountPercentage: 0,
        tags: ['tag1', 'tag2']
    }

    it('should select customer', () => {
        const mockState: CheckoutState = {
            customer: mockCustomer,
            items: [],
            total: 0,
            shippingAddress: null,
            paymentMethod: null,
            loading: false,
            error: null,
            orderSuccess: false,
            orderId: null,
            message: null
        }
        const result = selectCustomer.projector(mockState);
        expect(result).toEqual(mockCustomer);
    })

    it('should select shipping address', () => {
        const mockState: CheckoutState = {
            customer: null,
            items: [],
            total: 0,
            shippingAddress: mockShippingAddress,
            paymentMethod: null,
            loading: false,
            error: null,
            orderSuccess: false,
            orderId: null,
            message: null
        };
        const result = selectShippingAddress.projector(mockState);
        expect(result).toEqual(mockShippingAddress);
    });

    it('should select payment method', () => {
        const mockState: CheckoutState = {
            customer: null,
            items: [],
            total: 0,
            shippingAddress: null,
            paymentMethod: 'CARD',
            loading: false,
            error: null,
            orderSuccess: false,
            orderId: null,
            message: null
        };
        const result = selectPaymentMethod.projector(mockState);
        expect(result).toEqual('CARD');
    });

    it('should select checkout total', () => {
        const mockState: CheckoutState = {
            customer: null,
            items: [],
            total: 2499,
            shippingAddress: null,
            paymentMethod: null,
            loading: false,
            error: null,
            orderSuccess: false,
            orderId: null,
            message: null
        };
        const result = selectCheckoutTotal.projector(mockState);
        expect(result).toBe(2499);
    });

    it('should select checkout loading', () => {
        const mockState: CheckoutState = {
            customer: null,
            items: [],
            total: 0,
            shippingAddress: null,
            paymentMethod: null,
            loading: true,
            error: null,
            orderSuccess: false,
            orderId: null,
            message: null
        };
        const result = selectCheckoutLoading.projector(mockState);
        expect(result).toBeTrue();
    });

    it('should select checkout error', () => {
        const mockState: CheckoutState = {
            customer: null,
            items: [],
            total: 0,
            shippingAddress: null,
            paymentMethod: null,
            loading: false,
            error: 'An error occurred',
            orderSuccess: false,
            orderId: null,
            message: null
        };
        const result = selectCheckoutError.projector(mockState);
        expect(result).toBe('An error occurred');
    });

    it('should select order success', () => {
        const mockState: CheckoutState = {
            customer: null,
            items: [],
            total: 0,
            shippingAddress: null,
            paymentMethod: null,
            loading: false,
            error: null,
            orderSuccess: true,
            orderId: 'order-123',
            message: null
        };
        const result = selectOrderSuccess.projector(mockState);
        expect(result).toBe(true);
    });

    it('should select order id', () => {
        const mockState: CheckoutState = {
            customer: null,
            items: [],
            total: 0,
            shippingAddress: null,
            paymentMethod: null,
            loading: false,
            error: null,
            orderSuccess: true,
            orderId: 'order-123',
            message: null
        };
        const result = selectOrderId.projector(mockState);
        expect(result).toBe('order-123');
    });

    it('should select message', () => {
        const mockState: CheckoutState = {
            customer: null,
            items: [],
            total: 0,
            shippingAddress: null,
            paymentMethod: null,
            loading: false,
            error: null,
            orderSuccess: true,
            orderId: 'order-123',
            message: 'Order placed successfully'
        };
        const result = selectMessage.projector(mockState);
        expect(result).toBe('Order placed successfully');
    });

    it('should select checkout items', () => {
        const mockState: CheckoutState = {
            customer: null,
            items: [
                mockProduct1,
                mockProduct2
            ],
            total: 400,
            shippingAddress: null,
            paymentMethod: null,
            loading: false,
            error: null,
            orderSuccess: true,
            orderId: 'order-123',
            message: 'Order placed successfully'
        };
        const result = selectCheckoutItems.projector(mockState);
        expect(result).toEqual([ mockProduct1, mockProduct2 ]);
    });

    it('should select can place order', () => {
        const mockState: CheckoutState = {
            customer: mockCustomer,
            items: [
                mockProduct1,
                mockProduct2
            ],
            total: 400,
            shippingAddress: mockShippingAddress,
            paymentMethod: 'UPI',
            loading: false,
            error: null,
            orderSuccess: true,
            orderId: 'order-123',
            message: 'Order placed successfully'
        };
        const result = selectCanPlaceOrder.projector(
            mockState.customer, 
            mockState.shippingAddress, 
            mockState.paymentMethod
        );
        expect(result).toBe(true);       
    });

    it('should return false if shipping address is null', () => {
        const mockState: CheckoutState = {
            customer: mockCustomer,
            items: [
                mockProduct1,
                mockProduct2
            ],
            total: 400,
            shippingAddress: null,
            paymentMethod: 'UPI',
            loading: false,
            error: null,
            orderSuccess: true,
            orderId: 'order-123',
            message: 'Order placed successfully'  
        };
        const result = selectCanPlaceOrder.projector(
            mockState.customer, 
            mockState.shippingAddress, 
            mockState.paymentMethod
        );
        expect(result).toBe(false);
    });

    it('should return false if payment method is null', () => {
        const mockState: CheckoutState = {
            customer: mockCustomer,
            items: [
                mockProduct1,
                mockProduct2
            ],
            total: 400,
            shippingAddress: mockShippingAddress,
            paymentMethod: null,
            loading: false,
            error: null,
            orderSuccess: true,
            orderId: 'order-123',
            message: 'Order placed successfully'  
        };
        const result = selectCanPlaceOrder.projector(
            mockState.customer,
            mockState.shippingAddress,
            mockState.paymentMethod
        );
        expect(result).toBe(false);
    });
});
