import { ProductService } from "../../core/services/product.service";
import { createEffect, Actions, ofType } from "@ngrx/effects";

import { switchMap, map, catchError, of } from "rxjs";
import { loadProducts, loadProductsFailure, loadProductsSuccess } from "./products.actions";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class ProductsEffects {
    loadProducts$;
    constructor(
        private actions$: Actions,
        private productService: ProductService
    ) {

        this.loadProducts$ = createEffect(() =>
            this.actions$.pipe(
                ofType(loadProducts),
                switchMap(() =>
                    this.productService.getProducts().pipe(
                        map(products =>
                            loadProductsSuccess({ products })
                        ),
                        catchError(error =>
                            of(
                                loadProductsFailure({
                                    error
                                })
                            )
                        )
                    )
                )
            )
        )

    }


}