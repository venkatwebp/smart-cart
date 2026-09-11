import { createReducer, on } from "@ngrx/store";
import { initialProductDetailsState } from "./product-details.state";
import { loadProductById, loadProductByIdFailure, loadProductByIdSuccess } from "./product-details.actions";

export const productDetailsReducer = createReducer(
    initialProductDetailsState,

    on(loadProductById, (state) => {
        return {
            ...state,
            loading: true,
            error: null

        }
    }),

    on(loadProductByIdSuccess, (state, {product}) => {
        return{
            ...state,
            product,
            loading: false,
            error: null
        }
    }),

    on(loadProductByIdFailure, (state, {error}) => {
        return{
            ...state,
            loading: false,
            error: error
        }
    })
)