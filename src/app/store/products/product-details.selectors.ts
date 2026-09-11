import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductDetailsState } from "./product-details.state";



export const selectProductDetailsState = 
    createFeatureSelector<ProductDetailsState>('productDetails');

export const selectProduct = createSelector(
    selectProductDetailsState,
    (state) => state.product
)

export const selectProductLoading = createSelector(
    selectProductDetailsState,
    (state) => state.loading
)

export const selectProductError = createSelector(
    selectProductDetailsState,
    (state) => state.error
)