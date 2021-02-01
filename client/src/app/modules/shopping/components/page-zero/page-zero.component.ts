import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppState } from 'src/app/reducers';
import { ShoppingService } from '../../services/shopping/shopping.service';
import { userFirstName } from '../../../auth/ngrx/auth.selectors';
import { CartItemsEntityService } from '../../services/cart/cart-items-entity.service';
import { CartItem } from '../../../../models/CartItem';

@Component({
  selector: 'page-zero',
  templateUrl: './page-zero.component.html',
  styleUrls: ['./page-zero.component.css']
})
export class PageZeroComponent implements OnInit {
  userFirstName$: Observable<string>;
  error: '';
  shoppingButtonClicked: boolean = false;
  message: string = '';
  startOrResumeButtonName = 'Start Shopping';
  lastCartDate: any;
  lastOrderDate: any;
  finalMsg:string = 'Enjoy Shopping!';
  totalPrice$: Observable<number>;

  constructor(
    private shoppingService: ShoppingService,
    private store: Store<AppState>,
    private cartItemsEntityService: CartItemsEntityService,

  ) { }

  ngOnInit(): void {
    this.shoppingService.getShoppingStatus().subscribe(
      response => {
        if (response.data.isNewUser) {
          this.message = 'Welcome to your first shopping on our site!';
        } else {
          if (response.data.currentCart.createdAt) {
            this.startOrResumeButtonName = 'Resume shopping';
            this.message = 'You have a cart from';
            this.lastCartDate = response.data.currentCart.createdAt;

            this.totalPrice$ = this.cartItemsEntityService.entities$
            .pipe(
              map(cartItems => cartItems.reduce(this.reducer, 0))
            )
          } else {
            if (response.data.lastOrder.createdAt) {
              this.message = 'Your last purchase was done on ';
              this.lastOrderDate = response.data.lastOrder.createdAt;
            }
          }         
        }
      },
      error => {
        this.error = error.error.error;
        setTimeout(() => {
          this.error = '';
        }, 3000);
      }
    )

    this.userFirstName$ = this.store
    .pipe(
      select(userFirstName)
    );

    if (localStorage.getItem('backToShopWasPressed')) {
      const result = JSON.parse(localStorage.getItem('backToShopWasPressed'));
      if (result === true) {
        this.shoppingButtonClicked = true;
        localStorage.removeItem('backToShopWasPressed');
      }
    }
  }
  
  reducer = (accumulator: number, currCartItem: CartItem) => accumulator + (+currCartItem.itemPrice * currCartItem.quantity); 

  onStartShoppingClicked() {
    this.shoppingButtonClicked = true;
  }
}
