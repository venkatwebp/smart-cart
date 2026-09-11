import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductService } from "../../core/services/product.service";
import { catchError, of, switchMap } from "rxjs";
import { loadProductById, loadProductByIdFailure, loadProductByIdSuccess } from "./product-details.actions";


@Injectable({
    providedIn: 'root'
})

export class ProductDetailsEffects{
    loadDetailsProducts$;

    constructor(
        private actions$: Actions,
        private productService: ProductService
    ){
        this.loadDetailsProducts$ = createEffect(() =>
            this.actions$.pipe(
                ofType(loadProductById),
                switchMap(action => 
                    this.productService.getProductById(action.id).pipe(
                        switchMap(product => product === undefined
                            ? of(loadProductByIdFailure({
                                error: "Product not found"
                            }))
                            : of(loadProductByIdSuccess({ product }))
                        ),
                        catchError(error => 
                            of(loadProductByIdFailure({
                                error
                            }))
                        )
                    )
                )
            )

        )
    }
}