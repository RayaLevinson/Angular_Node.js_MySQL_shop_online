import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageZeroComponent } from './components/page-zero/page-zero.component';
import { ProductsResolver } from './services/products/products/products.resolver';
import { CategoriesResolver } from '../categories/services/categories.resolver';
import { CartItemsResolver } from './services/cart/cart-items.resolver';

const routes: Routes = [
  { 
    path: '', 
    component: PageZeroComponent,
    resolve: {
      categories: CategoriesResolver,
      products: ProductsResolver,
      cart: CartItemsResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingRoutingModule { }
