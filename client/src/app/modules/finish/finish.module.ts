import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinishRoutingModule } from './finish-routing.module';
import { OrderFinishedComponent } from './components/order-finished/order-finished.component';


@NgModule({
  declarations: [OrderFinishedComponent],
  imports: [
    CommonModule,
    FinishRoutingModule
  ]
})
export class FinishModule { }
