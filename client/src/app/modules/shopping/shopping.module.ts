import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityMetadataMap, EntityDefinitionService, EntityDataService } from '@ngrx/data';
import { FormsModule } from '@angular/forms';

import { ShoppingRoutingModule } from './shopping-routing.module';
import { ShoppingHomeComponent } from './components/shopping-home/shopping-home.component';
import { ShoppingProductsComponent } from './components/products/shopping-products/shopping-products.component';
import { CategoriesModule } from '../categories/categories.module';
import { SharedModule } from '../shared/shared.module';
import { ProductEntityService } from './services/products/products/product-entity.service';
import { ProductsDataService } from './services/products/products/products-data.service';
import { ProductsResolver } from './services/products/products/products.resolver';
import { CartComponent } from './components/cart/cart/cart.component';
import { CartItemComponent } from './components/cart/cart-item/cart-item.component';
import { CartItemsEntityService } from './services/cart/cart-items-entity.service';
import { CartItemsResolver } from './services/cart/cart-items.resolver';
import { CartItemsDataService } from './services/cart/cart-items-data.service';
import { PageZeroComponent } from './components/page-zero/page-zero.component';
import { ShoppingService } from './services/shopping/shopping.service';
import { SearchProductsService } from './services/products/searchProducts/search-products.service';

const entityMetadata: EntityMetadataMap = {
  Product: {
  },
  CartItem: {
  }
}

@NgModule({
  declarations: [ShoppingHomeComponent, ShoppingProductsComponent, CartComponent, CartItemComponent, PageZeroComponent],
  imports: [
    CommonModule,
    FormsModule,
    ShoppingRoutingModule,
    CategoriesModule,
    SharedModule
  ],
  providers: [
    ProductEntityService,
    ProductsDataService,
    ProductsResolver,
    CartItemsEntityService,
    CartItemsDataService,
    CartItemsResolver,
    ShoppingService,
    SearchProductsService
  ],
  exports: [CartComponent]
})
export class ShoppingModule { 
  constructor(
    private eds: EntityDefinitionService,
    private entityDataService: EntityDataService,
    private productsDataService: ProductsDataService,
    private cartItemsDataService: CartItemsDataService
  ) {
    eds.registerMetadataMap(entityMetadata);

    entityDataService.registerServices({ Product: productsDataService, CartItem: cartItemsDataService });
  }  
}
