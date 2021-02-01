import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { DefaultDataService, HttpUrlGenerator} from '@ngrx/data';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { CartItem } from '../../../../models/CartItem';
import { BASE_URL } from '../../../../config/constants';
import { GetCartResponse } from '../../../../models/GetCartResponse';
import { Update } from '@ngrx/entity';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  withCredentials: true
};

@Injectable()
export class CartItemsDataService extends DefaultDataService<CartItem> {
  rootUrl: string = `${BASE_URL}/api/shopping`;

  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {

    super('CartItem', http, httpUrlGenerator);
  }

  // Override default method
  // Get all items of the cart
  getAll(): Observable<CartItem[]> {
    return this.http.get<GetCartResponse>(`${this.rootUrl}/cart`, httpOptions)
      .pipe(
        map(response => response.data)     
      );
    } 
    
  // Override default method
  // Add a cart item to the cart    
  add(cartItem: CartItem): Observable<CartItem> {
    return this.http.post(`${this.rootUrl}/cartItem`, cartItem, httpOptions)
    .pipe(
      map(response => response['data']),
    );
  }

  // Override default method
  // Update a cart item to the cart   
  update(cartItem: Update<CartItem>): Observable<CartItem> {
    return this.http.post(`${this.rootUrl}/cartItem`, cartItem, httpOptions)
    .pipe(
      map(response => response['data']),
    );
  }

  // Override default method
  // Delete cart item by id
  delete(id: string | number): Observable<any> {
    return this.http.delete(`${this.rootUrl}/cartItem/${id}`, httpOptions)
  }
}
