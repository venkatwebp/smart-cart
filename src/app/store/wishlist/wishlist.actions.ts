import { createAction, props } from "@ngrx/store";
import { Product } from "../../core/models/product.model";


export const addToWishlist = createAction (
    '[Wishlist] Add to Wishlist',
    props<{ product: Product }>()
)

export const removeFromWishlist = createAction (
    '[Wishlist] Remove From Wishlist',
    props<{ productId: number }>()
)

export const toggleWishlist = createAction (
    '[Wishlist] Toggle Wishlist',
    props<{ product: Product }>()
)

export const clearWishlist = createAction(
    '[Wishlist] Clear Wishlist'
)