import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { GetProductsResponse } from '../../../../../models/GetProductsResponse';
import { Product } from '../../../../../models/Product';
import { BASE_URL } from '../../../../../config/constants';
import { MY_DOMAIN } from '../../../../../config/constants';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class SearchProductsService {
  rootUrl: string = `${BASE_URL}/api/products`; 

  constructor(private http:HttpClient) { }

  getProducts(productName: string): Observable<Product[]> {
    return this.http
      .get<GetProductsResponse>(
        `${this.rootUrl}/?product=${productName}`, 
        httpOptions
      ).pipe(
          map(response => response.data),
          map(products => products.map(product => ({...product, imagePath: `${MY_DOMAIN}${BASE_URL}/${product.imagePath}`})))
      )
  }
}
