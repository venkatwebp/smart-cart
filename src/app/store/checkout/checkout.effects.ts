import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { placeOrder, placeOrderFailure, placeOrderSuccess } from "./checkout.actions";
import { selectCheckoutState } from "./checkout.selectors";
import { map, switchMap, catchError, take } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { of } from "rxjs";



@Injectable({
    providedIn: 'root'
})

export class CheckoutEffects{
    placeOrder$

    constructor(
        private actions: Actions,
        private store: Store
    ){
        this.placeOrder$ = createEffect(() => 
            this.actions.pipe(
                ofType(placeOrder),
                switchMap(_ => 
                    this.store.select(selectCheckoutState).pipe(
                        take(1),
                        map(_ => {
                            const orderId = Date.now();
                            console.log('Generated Order ID:', orderId);
                            return placeOrderSuccess({
                                orderId: orderId.toString(),
                                message: "Order placed successfully"
                            })
                        }),
                        catchError((error: unknown) => {
                            return of(placeOrderFailure({
                                error: error instanceof Error ? error.message : String(error)
                            }));
                        })
                    )
                )
            )
        )
    }
}