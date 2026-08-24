import { createReducer, on } from "@ngrx/store";
import { initialWishlistState } from "./wishlist.state";
import { addToWishlist, clearWishlist, removeFromWishlist, toggleWishlist } from "./wishlist.actions";


export const wishlistReducer = createReducer(
    initialWishlistState,

    on(addToWishlist, (state, { product }) => {
        const alreadyExists = state.items.some(item => item.id === product.id);

        if(alreadyExists){
            return state;
        }

        return{
            ...state,
            items: [...state.items, product]
        }
    }),


    on(removeFromWishlist, (state, { productId }) => {
        return{
            ...state,
            items: state.items.filter(
                item => item.id === productId
            )
        }
    }),

    on(toggleWishlist, (state, { product }) => {
        const alreadyExists = state.items.some(
            item => item.id === product.id
        );

        if(alreadyExists){
            return {
                ...state,
                items: state.items.filter(
                    item => item.id === product.id
                )
            }
        }

        return{
            ...state,
            items: [...state.items, product]
        }
    }),
    
    on(clearWishlist, state => ({ ...state, items: [] }))
);