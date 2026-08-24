import { Product } from "../../core/models/product.model";


export interface WishlistState{
    items: Product[]
}

export const initialWishlistState: WishlistState = {
    items: []
}