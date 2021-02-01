import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { DefaultDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { Product } from '../../../../../models/Product';
import { BASE_URL } from '../../../../../config/constants';
import { MY_DOMAIN } from '../../../../../config/constants';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  withCredentials: true
};

@Injectable()
export class ProductsDataService extends DefaultDataService<Product> {
  rootUrl: string = `${BASE_URL}/api/products`;

    constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
      super('Product', http, httpUrlGenerator);
    }

    // Override default method
    getWithQuery(queryParams: QueryParams): Observable<Product[]> {
      const categoryId = queryParams['category'];

      if (!isNaN(parseInt(categoryId.toString()))) {
        // Example: `${BASE_URL}/api/products/?category=1`
        return this.http.get(`${this.rootUrl}/?category=${queryParams['category']}`, httpOptions)
          .pipe(
            map(response => response['data']),
            map(products => products.map(product => ({...product, imagePath: `${MY_DOMAIN}${BASE_URL}/${product.imagePath}`})))
          );
      }
    }
}