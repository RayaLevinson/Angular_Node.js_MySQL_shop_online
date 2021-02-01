import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriesResolver } from '../categories/services/categories.resolver';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';

const routes: Routes = [
  {
    path: '', 
    component: AdminHomeComponent,
    resolve: {
      categories: CategoriesResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
