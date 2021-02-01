import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Product } from '../../../models/Product';
import { GetProductsResponse } from '../../../models/GetProductsResponse';
import { PostProductResponse } from '../../../models/PostProductResponse';
import { GetNumberOfProducts } from '../../../models/GetNumberOfProducts';
import { BASE_URL } from '../../../config/constants';

const httpOptions = {
  withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class AdminProductsService {
  rootUrl: string = `${BASE_URL}/api/products`;

  productChanged: EventEmitter<Product> = new EventEmitter();
  productAdded: EventEmitter<Product> = new EventEmitter();

  constructor(private http:HttpClient) { }

  getProducts(categoryId: number): Observable<GetProductsResponse> {
    return this.http
      .get<GetProductsResponse>(
        `${this.rootUrl}/?category=${categoryId}`, 
        httpOptions
      );
  }

  addProduct(productData): Observable<PostProductResponse> {    
    return this.http
      .post<PostProductResponse>(
        this.rootUrl, 
        productData, 
        httpOptions
      );
  }

  updateProduct(productData, id): Observable<PostProductResponse> {
    return this.http
      .put<PostProductResponse>(
        `${this.rootUrl}/${id}`, 
        productData, 
        httpOptions
      );
  }

  getNumOfProducts(): Observable<GetNumberOfProducts> {
    return this.http
      .get<GetNumberOfProducts>(
        `${this.rootUrl}/totalNumber`, 
        httpOptions
      );
  }
}
