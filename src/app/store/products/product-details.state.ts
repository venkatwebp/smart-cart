import { Product } from "../../core/models/product.model";


export interface ProductDetailsState{
    product: Product | null,
    loading: boolean,
    error: string | null
}

export const initialProductDetailsState: ProductDetailsState = {
    product: null,
    loading: false,
    error: null
}