import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderFinishedComponent } from './components/order-finished/order-finished.component';

const routes: Routes = [
  { path: '', component: OrderFinishedComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinishRoutingModule { }
