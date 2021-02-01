import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartItem } from 'src/app/models/CartItem';

import { CartItemsEntityService } from './cart-items-entity.service';

@Injectable()
export class CartItemsResolver implements Resolve<CartItem[]> {

  constructor(private cartItemsEntityService: CartItemsEntityService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<CartItem[]> {

      return this.cartItemsEntityService.getAll()
        .pipe(
          map(response => response['data'])
        )
  }
}