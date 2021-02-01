import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { AppState } from 'src/app/reducers';
import { City } from '../../../../models/City';
import { CartItem } from '../../../../models/CartItem';
import { CitiesService } from '../../../auth/services/cities.service';
import { currUser } from '../../../auth/ngrx/auth.selectors';
import { OrderService } from '../../services/order.service';
import { InputControlService } from '../../../shared/services/input-control.service';
import { CartItemsEntityService } from '../../../shopping/services/cart/cart-items-entity.service';
import { ShippingAvailable } from '../../validators/shippingAvailable';
import { DateNotInPast } from '../../validators/dateNotInPast';

import { CREDIT_CARD_NUMBERS_REGEX } from '../../validators/constValues';
import {
  STREET_MIN_LENGTH,
  STREET_MAX_LENGTH,
  HOUSE_MIN_LENGTH,
  HOUSE_MAX_LENGTH,
} from '../../../auth/validators/constValues';
import { User } from 'src/app/models/User';

@Component({
  selector: 'order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  cities: City[];
  user: User;
  totalPrice: number;
  error: string = '';

  orderForm = new FormGroup({
    city: new FormControl(
      '', 
      [
        Validators.required
      ]
    ),
    street: new FormControl(
      '', 
      [
        Validators.required,
        Validators.minLength(STREET_MIN_LENGTH),
        Validators.maxLength(STREET_MAX_LENGTH)
      ]
    ),
    house: new FormControl(
      '', 
      [
        Validators.required,
        Validators.minLength(HOUSE_MIN_LENGTH),
        Validators.maxLength(HOUSE_MAX_LENGTH)
      ]
    ),
    apartment: new FormControl(
      '', 
      [
        Validators.required
      ]
    ),    
    dateToShip: new FormControl(
      '', 
      [
        Validators.required,
        this.dateNotInPast.validate
      ],
      [ this.shippingAvailable.validate ]
    ),    
    creaditCard: new FormControl('', [
      Validators.required,
      Validators.pattern(CREDIT_CARD_NUMBERS_REGEX),
    ])
  });

  constructor(
    private router: Router,
    private citiesService: CitiesService,
    private store: Store<AppState>,
    private inputControlService: InputControlService,
    private orderService: OrderService,
    private cartItemsEntityService: CartItemsEntityService,
    private shippingAvailable: ShippingAvailable,
    private dateNotInPast: DateNotInPast
  ) { }

  ngOnInit(): void {
    this.citiesService.getCities().subscribe(
      response => this.cities = response.data,
      err => {
        this.error = err.error.error;
        setTimeout(() => {
          this.error = '';
        }, 4000);
      }
    );

    this.inputControlService.doubleClickWasPressed$.subscribe(wasPressed => {
      this.orderForm.get('city').setValue(this.user.city);
      this.orderForm.get('street').setValue(this.user.street);
      this.orderForm.get('house').setValue(this.user.house);
      this.orderForm.get('apartment').setValue(this.user.apartment);
    });
    
    this.store.pipe(
      select(currUser)
    )
    .subscribe(user => this.user = user);
  }

  onSubmit() {
    if(this.orderForm.invalid) {
      return;
    }

    this.cartItemsEntityService.entities$
      .pipe(
        map(cartItems => cartItems.reduce(this.reducer, 0)),
      ).subscribe(result => this.totalPrice = result);

    let fourLastDigits;

    if (this.orderForm.get('creaditCard').value.length > 4) {
      fourLastDigits = this.orderForm.get('creaditCard').value.slice(this.orderForm.get('creaditCard').value.length-4, this.orderForm.get('creaditCard').value.length);
    } else {
      fourLastDigits = this.orderForm.get('creaditCard').value;
    }
    console.log('fourLastDigits: ', fourLastDigits)

    const orderToSave = {
      ...this.orderForm.value, 
      totalPrice: this.totalPrice,
      creditCardPartialDigits: fourLastDigits
    };

    this.orderService.saveOrder(orderToSave).subscribe(
      response => {
        this.cartItemsEntityService.clearCache();

        this.router.navigate(['summary'], { queryParams: { orderSummary: response.data.orderSummaryFileLocation } });
      },
      error => {
        this.error = error.error.error;
        setTimeout(() => {
          this.error = '';
        }, 4000);
      });
  }

  onChangeCity(e) {    
    this.orderForm.get('city').setValue(e.target.value);    
  }
  
  reducer = (accumulator: number, currCartItem: CartItem) => accumulator + (+currCartItem.itemPrice * currCartItem.quantity);   
}