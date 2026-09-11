import { createAction, props } from "@ngrx/store";
import { Customer, ShippingAddress } from "./checkout.state";


export const setCustomer = createAction(
    '[Checkout] Set Customer',
    props<{
        customer: Customer
    }>()
);

export const setShippingAddress = createAction(
    '[Checkout] Set Shipping Address',
    props<{
        shippingAddress: ShippingAddress
    }>()
);

export const setPaymentMethod = createAction(
    '[Checkout] Set Payment Method',
    props<{
        paymentMethod: 'COD' | 'CARD' | 'UPI'
    }>()
);

export const placeOrder = createAction(
    '[Checkout] Place Order'
);

export const placeOrderSuccess = createAction(
    '[Checkout] Place Order Success',
    props<{
        orderId: string,
        message: string
    }>()
);

export const placeOrderFailure = createAction(
    '[Checkout] Place Order Failure',
    props<{
        error: string
    }>()
);

export const closeOrderSuccessToast = createAction(
    '[Checkout] Close Order Success Toast',
)