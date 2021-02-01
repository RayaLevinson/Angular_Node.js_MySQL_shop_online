import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { CategoriesModule } from '../categories/categories.module';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AdminProductsComponent } from './components/products/admin-products/admin-products.component';
import { AdminProductsFormComponent } from './components/products/admin-products-form/admin-products-form.component';
import { AdminProductsService } from './services/admin-products.service';

@NgModule({
  declarations: [AdminHomeComponent, AdminProductsComponent, AdminProductsFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    SharedModule,
    CoreModule,
    CategoriesModule
  ],
  exports: [AdminHomeComponent],
  providers: [AdminProductsService]
})
export class AdminModule {}
