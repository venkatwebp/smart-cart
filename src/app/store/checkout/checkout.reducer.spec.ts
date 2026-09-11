import { placeOrder, placeOrderFailure, placeOrderSuccess, setCustomer, setPaymentMethod, setShippingAddress } from "./checkout.actions";
import { checkoutReducer } from "./checkout.reducer";
import { CheckoutState, initialCheckoutState } from "./checkout.state";

describe('Checkout reducer', () => {

    it('should set customer when setCustomer action is dispatched', () => {
        const initialState: CheckoutState = {
            ...initialCheckoutState,
            customer: null
        };
        const action = setCustomer({
            customer: {
                fullName: 'Test Customer',
                email: 'test@example.com',
                phone: '555-0100'
            }
        });
        const result = checkoutReducer(initialState, action);
        expect(result.customer).toEqual(action.customer);
    });

    it('should set shipping address when setShippingAddress action is dispatched', () => {
        const initialState: CheckoutState = {
            ...initialCheckoutState,
            shippingAddress: null
        };
        const action = setShippingAddress({
            shippingAddress: {
                address: '123 Test Street',
                city: 'Test City',
                state: 'Test State',
                postalCode: '12345'
            }
        });
        const result = checkoutReducer(initialState, action);
        expect(result.shippingAddress).toEqual(action.shippingAddress);
    });

    it('should set payment method when setPaymentMethod action is dispatched', () => {
        const initialState: CheckoutState = {
            ...initialCheckoutState,
            paymentMethod: null
        };
        const action = setPaymentMethod({
            paymentMethod: 'UPI'
        });
        const result = checkoutReducer(initialState, action);
        expect(result.paymentMethod).toEqual(action.paymentMethod);
    });

    it('should set loading to true when placeOrder action is dispatched', () => {
        const initialState: CheckoutState = {
            ...initialCheckoutState,
            loading: false
        }
        const action = placeOrder();
        const result = checkoutReducer(initialState, action);
        expect(result.loading).toBe(true);
    });

    it('should set orderSuccess to true when placeOrderSuccess action is dispatched', () => {
        const initialState: CheckoutState = {
            ...initialCheckoutState,
            orderSuccess: false
        }
        const action = placeOrderSuccess({
            orderId: '12345',
            message: 'Order placed successfully',
        });
        const result = checkoutReducer(initialState, action);
        expect(result.orderSuccess).toBe(true);
    });

    it('should set orderSuccess to false when placeOrderFailure action is dispatched', () => {
        const initialState: CheckoutState = {
            ...initialCheckoutState,
            orderSuccess: true
        };
        const action = placeOrderFailure({
            error: 'Failed to place order'
        });
        const result = checkoutReducer(initialState, action);
        expect(result.orderSuccess).toBe(false);
    });

    it('should clear error when placeOrder action is dispatched', ()=> {
        const initialState: CheckoutState = {
            ...initialCheckoutState,
            error: "Previous error"
        }
        const action = placeOrder();
        const result = checkoutReducer(initialState, action);
        expect(result.error).toBeNull();
    });

    it('should store orderId when placeOrderSuccess action is dispatched', () => {
        const initialState: CheckoutState = {
            ...initialCheckoutState,
            orderId: null
        }
        const action = placeOrderSuccess({
            orderId: '12345',
            message: 'Order placed successfully'
        });
        const result = checkoutReducer(initialState, action);
        expect(result.orderId).toBe(action.orderId);
    });

    it('should store message when placeOrderSuccess action is dispatched', () => {
        const initialState: CheckoutState = {
            ...initialCheckoutState,
            message: null
        };
        const action = placeOrderSuccess({
            message: 'Order placed successfully',
            orderId: '12345'
        });
        const result = checkoutReducer(initialState, action);
        expect(result.message).toBe(action.message);
    });

    it('should set loading to false when placeOrderFailure action is dispatched', () => {
        const initialState: CheckoutState = {
            ...initialCheckoutState,
            loading: true
        };
        const action = placeOrderFailure({
            error: 'Failed to place order'
        });
        const result = checkoutReducer(initialState, action);
        expect(result.loading).toBe(false);
    });

    it('should store error when placeOrderFailure action is dispatched', () => {
        const initialState: CheckoutState = {
            ...initialCheckoutState,
            error: null
        };
        const action = placeOrderFailure({
            error: 'Failed to place order'
        });
        const result = checkoutReducer(initialState, action);
        expect(result.error).toBe(action.error);
    });

    it('should return the same state when an unknown action is dispatched', () => {
        const initialState: CheckoutState = {
            ...initialCheckoutState
        };
        const action = {type: 'UNKNOWN_ACTION'};
        const result = checkoutReducer(initialState, action);
        expect(result).toBe(initialState);
    });

});

