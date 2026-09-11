import { Product } from "../../core/models/product.model"

export interface Customer{
    fullName: string,
    email: string,
    phone: string
}

export interface ShippingAddress{
    address: string,
    city: string,
    state: string,
    postalCode: string
}

export interface CheckoutState {
    items: Product[],
    total: number,
    customer: Customer | null,
    shippingAddress: ShippingAddress | null,
    paymentMethod: 'COD' | 'CARD' | 'UPI' | null,
    loading: boolean,
    error: string | null,
    orderSuccess: boolean,
    orderId: string | null,
    message: string | null
}

export const initialCheckoutState: CheckoutState = {
    items: [],
    total: 0,
    customer: null,
    shippingAddress: null,
    paymentMethod: null,
    loading: false,
    error: null,
    orderSuccess: false,
    orderId: null,
    message: null
}