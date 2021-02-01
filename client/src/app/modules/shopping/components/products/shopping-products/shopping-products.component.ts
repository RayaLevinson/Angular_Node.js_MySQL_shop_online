import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';

import { Product } from '../../../../../models/Product';
import { ProductEntityService } from '../../../services/products/products/product-entity.service';
import { SearchProductsService } from '../../../services/products/searchProducts/search-products.service';

@Component({
  selector: 'shopping-products',
  templateUrl: './shopping-products.component.html',
  styleUrls: ['./shopping-products.component.css']
})
export class ShoppingProductsComponent implements OnInit {
  products$: Observable<Product[]>;
  productName: string = '';

  constructor(
    private productEntityService: ProductEntityService,
    private route: ActivatedRoute,
    private searchProductsService: SearchProductsService
    ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.products$ = this.productEntityService.getWithQuery(params);
    });    
  }

  searchProduct() {
    this.products$ = this.searchProductsService.getProducts(this.productName);
    this.productName = '';
  }
}
