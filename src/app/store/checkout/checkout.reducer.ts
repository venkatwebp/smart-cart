import { createReducer, on } from "@ngrx/store";
import { initialCheckoutState } from "./checkout.state";
import { placeOrder, placeOrderFailure, placeOrderSuccess, setCustomer, setPaymentMethod, setShippingAddress, closeOrderSuccessToast } from "./checkout.actions";

export const checkoutReducer = createReducer(
    initialCheckoutState,

    on(setCustomer, (state, { customer }) => {
        return {
            ...state,
            customer
        }
    }),

    on(setShippingAddress, (state, {shippingAddress}) => {
        return{
            ...state,
            shippingAddress
        }
    }),

    on(setPaymentMethod, (state, { paymentMethod }) => {
        return{
            ...state,
            paymentMethod
        }
    }),

    on(placeOrder, state => {
        return{
            ...state,
            loading: true,
            error: null,
            orderSuccess: false
        }
    }),

    on(placeOrderSuccess, (state, {orderId, message}) => {
        console.log('Success Action:', orderId, message);
        return{
            ...state,
            loading: false,
            orderSuccess: true,
            orderId,
            message,
        }
    }),

    on(placeOrderFailure, (state, {error}) => {
        return {
            ...state,
            loading: false,
            orderSuccess: false,
            error
        }
    }),

    on(closeOrderSuccessToast, (state) => {
        return{
            ...state,
            orderSuccess: false
        }
    })
    
)