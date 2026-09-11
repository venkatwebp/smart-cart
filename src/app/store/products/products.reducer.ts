import { createReducer, on } from "@ngrx/store";
import { initialProductState } from "./products.state";
import { loadProducts, loadProductsFailure, loadProductsSuccess } from "./products.actions";



export const productReducer = createReducer(
    initialProductState,

    on(loadProducts, (state) => {
        return{
            ...state,
            loading: true,
            error: null
        }
    }),

    on(loadProductsSuccess, (state, {products}) => {
        return{
            ...state,
            items: products,
            loading: false,
            error: null
        }
    }),

    on(loadProductsFailure, (state, {error}) => {
        return{
            ...state,
            loading: false,
            error
        }
    })
)