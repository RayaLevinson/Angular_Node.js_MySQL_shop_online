import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BASE_URL } from '../../../config/constants';
import { Order } from '../../../models/Order';
import { PostOrderResponse } from '../../../models/PostOrderResponse';
import { GetNumberOfOrders } from '../../../models/GetNumberOfOrder';
import { ShippingAvailableResponse } from '../../../models/ShippingAvailableResponse';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  rootUrl: string = `${BASE_URL}/api/orders`; 

  constructor(private http:HttpClient) { }

  saveOrder(order: Order): Observable<PostOrderResponse> {
    return this.http.post<PostOrderResponse>(this.rootUrl, order, httpOptions);
  }

  getTotalNumOfOrders(): Observable<GetNumberOfOrders> {
    return this.http.get<GetNumberOfOrders>(`${this.rootUrl}/totalNumber`, httpOptions);
  }

  shippingAvailable(date: any): Observable<ShippingAvailableResponse> {
    return this.http.get<ShippingAvailableResponse>(`${this.rootUrl}/shippingAvailable?date=${date}`, httpOptions);
  }
}

