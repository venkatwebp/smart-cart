import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore} from '@ngrx/store/testing';
import { Checkout } from './checkout';
import { initialCheckoutState } from '../../store/checkout/checkout.state';

describe('Checkout', () => {
  let component: Checkout;
  let fixture: ComponentFixture<Checkout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Checkout],
      providers: [
        provideMockStore({
          initialState: {
            checkout: initialCheckoutState
          }
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Checkout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
