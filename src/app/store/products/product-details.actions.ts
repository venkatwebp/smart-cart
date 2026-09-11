import { createAction, props } from "@ngrx/store";
import { Product } from "../../core/models/product.model";

export const loadProductById = createAction(
    '[Product] Load Product By Id',
    props<{
       id: number
    }>()
);

export const loadProductByIdSuccess = createAction(
    '[Product] Load Product By Id Success',
    props<{
        product: Product
    }>()
);

export const loadProductByIdFailure = createAction(
    '[Product] Load Product By Id Failure',
    props<{
        error: string
    }>()
)