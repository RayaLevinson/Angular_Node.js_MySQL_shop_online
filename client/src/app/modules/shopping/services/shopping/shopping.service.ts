import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GetShoppingStatus } from '../../../../models/GetShoppingStatus';
import { BASE_URL } from '../../../../config/constants';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  rootUrl: string = `${BASE_URL}/api/shopping/cart/status`; 

  constructor(private http:HttpClient) { }

  getShoppingStatus(): Observable<GetShoppingStatus> {
    return this.http.get<GetShoppingStatus>(this.rootUrl, httpOptions);
  }
}
