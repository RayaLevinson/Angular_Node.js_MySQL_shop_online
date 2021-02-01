import { Injectable, EventEmitter } from '@angular/core';
import { Product } from '../../../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  selectedProductToEdit$: EventEmitter<Product> = new EventEmitter();

  constructor() { }

}
