import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ProductEntityService } from './product-entity.service';

// Fetch data from the server and store it in the Store
@Injectable()
export class ProductsResolver implements Resolve<boolean> {

  constructor(private productsService: ProductEntityService) {
  }

    resolve(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> { 
      return this.productsService.getWithQuery(route.queryParams)
        .pipe(
          map(val => !!val)
        );
    }
}

