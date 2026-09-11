import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductState } from "./products.state";




export const selectProductState =
    createFeatureSelector<ProductState>('product');

export const productList = createSelector(
    selectProductState,
    (state) => state.items
)

export const loadingState = createSelector(
    selectProductState,
    (state) => state.loading
)

export const errorState = createSelector(
    selectProductState,
    (state) => state.error
)