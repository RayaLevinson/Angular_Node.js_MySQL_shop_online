import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';

import { CartItem } from '../../../../../models/CartItem';
import { CartItemsEntityService } from '../../../services/cart/cart-items-entity.service';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @Input() isCartEditable: boolean = false;
  cartItems$: Observable<CartItem[]>;
  cartItemsNum$: Observable<number>;
  totalPrice$: Observable<number>;
  productToSearch: string = '';

  constructor(
    private cartItemsEntityService: CartItemsEntityService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.reload();
  }

  reload() {
    this.cartItems$ = this.cartItemsEntityService.entities$;

    this.totalPrice$ = this.cartItemsEntityService.entities$
    .pipe(
      map(cartItems => cartItems.reduce(this.reducer, 0))
    );

    this.cartItemsNum$ = this.cartItemsEntityService.entities$
      .pipe(
        map(cartItems => cartItems.length)
      );
  }
  
  reducer = (accumulator: number, currCartItem: CartItem) => accumulator + (+currCartItem.itemPrice * currCartItem.quantity); 

  onClearCart() {
    this.cartItemsEntityService.entities$
      .pipe(
        map(cartItems => cartItems.forEach(item => this.cartItemsEntityService.delete(item.id))),
        first()
      ).subscribe();
  }

  onBackToShopClicked() {
    localStorage.setItem('backToShopWasPressed', JSON.stringify(true));
    this.router.navigate(['.', 'shopping'], { queryParams: { category: '1' } });
  }

  onKey(e) {
    this.reload();
  }
}
