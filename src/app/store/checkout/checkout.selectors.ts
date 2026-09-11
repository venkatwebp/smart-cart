import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CheckoutState } from "./checkout.state";

export const selectCheckoutState = 
    createFeatureSelector<CheckoutState>('checkout');

export const selectCustomer = createSelector(
   selectCheckoutState,
   state => state.customer 
)

export const selectShippingAddress = createSelector(
    selectCheckoutState,
    state => state.shippingAddress
)

export const selectPaymentMethod = createSelector(
    selectCheckoutState,
    state => state.paymentMethod
);

export const selectCheckoutTotal = createSelector(
    selectCheckoutState,
    state => state.total
);

export const selectCheckoutLoading = createSelector(
    selectCheckoutState,
    state => state.loading
);

export const selectCheckoutError = createSelector(
    selectCheckoutState,
    state => state.error
);

export const selectOrderSuccess = createSelector(
    selectCheckoutState,
    state => state.orderSuccess
);

export const selectOrderId = createSelector(
    selectCheckoutState,
    state => state.orderId
);

export const selectMessage = createSelector(
    selectCheckoutState,
    state => state.message
);

export const selectCheckoutItems = createSelector(
    selectCheckoutState,
    state => state.items
);

export const selectCanPlaceOrder = createSelector(
    selectCustomer,
    selectShippingAddress,
    selectPaymentMethod,
    (customer, shippingAddress, paymentMethod) => {
        return !!customer && !!shippingAddress && !!paymentMethod;
    }
)