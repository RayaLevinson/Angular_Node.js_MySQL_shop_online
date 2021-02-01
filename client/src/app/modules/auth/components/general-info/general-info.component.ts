import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AppState } from 'src/app/reducers';
import { isLoggedIn, userFirstName  } from '../../../auth/ngrx/auth.selectors';
import { OrderService } from '../../../order/services/order.service';
import { AdminProductsService } from '../../../admin/services/admin-products.service';

@Component({
  selector: 'general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.css']
})
export class GeneralInfoComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  numOfOrders: number;
  numOfProducts: number;
  error: string

  constructor(
    private store: Store<AppState>,
    private orderService: OrderService,
    private adminProductsService: AdminProductsService
  ) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.store
    .pipe(
      select(isLoggedIn)
    );

    this.orderService.getTotalNumOfOrders().subscribe(
      response => {
        this.numOfOrders = response.data.numberOfOrders;
      },
      error => {       
        this.error = error.error.error;
        setTimeout(() => {
          this.error = '';
        },4000);
      }
    )
    this.adminProductsService.getNumOfProducts().subscribe(
      response => {
        this.numOfProducts = response.data.numberOfProducts;
      },
      error => {
        this.error = error.error.error;
        setTimeout(() => {
          this.error = '';
        },4000);
      }
    )
  }
}
