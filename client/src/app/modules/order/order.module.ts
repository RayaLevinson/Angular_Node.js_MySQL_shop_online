import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ShoppingModule } from '../shopping/shopping.module';
import { SharedModule } from '../shared/shared.module';
import { OrderRoutingModule } from './order-routing.module';
import { OrderHomeComponent } from './components/order-home/order-home.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { FinishModule } from '../finish/finish.module';

@NgModule({
  declarations: [OrderHomeComponent, OrderFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OrderRoutingModule,
    ShoppingModule,
    SharedModule,
    FinishModule
  ],
  exports: [OrderHomeComponent]
})
export class OrderModule { }
