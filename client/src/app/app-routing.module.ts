import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthUserGuard } from './modules/auth/guards/authUser.guard';
import { AuthAdminGuard } from './modules/auth/guards/authAdmin.guard';

const routes: Routes = [
  // --> Lazy Loading
  { path: 'shopping', 
    loadChildren: () => 
      import('./modules/shopping/shopping.module').then(m => m.ShoppingModule),
    canActivate: [AuthUserGuard]
  },
  { path: 'order', 
    loadChildren: () => 
      import('./modules/order/order.module').then(m => m.OrderModule),
    canActivate: [AuthUserGuard]
  },
  { path: 'summary', 
    loadChildren: () => 
      import('./modules/finish/finish.module').then(m => m.FinishModule),
    canActivate: [AuthUserGuard]
  },
  { path: 'admin', 
    loadChildren: () => 
      import('./modules/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthAdminGuard]
  },
  // <-- Lazy Loading
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
