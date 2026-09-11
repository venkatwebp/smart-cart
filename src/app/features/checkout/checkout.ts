import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { setCustomer, setShippingAddress, setPaymentMethod, placeOrder, closeOrderSuccessToast } from '../../store/checkout/checkout.actions';
import { Observable, timer } from 'rxjs';
import {
  selectOrderSuccess, selectOrderId, selectMessage, selectCheckoutError, selectCheckoutLoading
} from '../../store/checkout/checkout.selectors';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout implements OnInit{

  checkoutForm: FormGroup;
  orderSuccess$ = new Observable<boolean>();
  orderId$ = new Observable<string | null>();
  message$ = new Observable<string | null>();
  error$ = new Observable<string | null>();
  loading$ = new Observable<boolean>();

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {
    this.checkoutForm = this.fb.group({
      customer: this.fb.group({
        fullName: ['', Validators.required], 
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]]
      }),

      shippingAddress: this.fb.group({
        address: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        postalCode: ['', Validators.required, Validators.pattern(/^\d{6}$/)]
      }),

      paymentMethod: ['', Validators.required]
    });

    this.orderSuccess$ = this.store.select(selectOrderSuccess);
    this.orderId$ = this.store.select(selectOrderId);
    this.message$ = this.store.select(selectMessage);
    this.error$ = this.store.select(selectCheckoutError);
    this.loading$ = this.store.select(selectCheckoutLoading);
  }

  ngOnInit(){
    this.orderSuccess$.subscribe(success => {
      if(success){
        timer(3000).subscribe(() => {
          this.store.dispatch(closeOrderSuccessToast())
        })
      }
    })
  }

  onSubmit() {
    if (this.checkoutForm.invalid) {
      return;
    }

    const formValue = this.checkoutForm.value;
    console.log('Form Value:', formValue);

    this.store.dispatch(setCustomer({
      customer: formValue.customer
    }));

    this.store.dispatch(setShippingAddress({
      shippingAddress: formValue.shippingAddress
    }));

    this.store.dispatch(setPaymentMethod({
      paymentMethod: formValue.paymentMethod
    }));

    this.store.dispatch(placeOrder());


  }



}
