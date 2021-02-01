import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, tap, first } from 'rxjs/operators';

import { CategoryEntityService } from './category-entity.service';

// Fetch data from the server and store it in the Store
@Injectable()
export class CategoriesResolver implements Resolve<boolean> {

  constructor(private categoriesService: CategoryEntityService) {
  }

    resolve(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> { 
      return this.categoriesService.loaded$
        .pipe(
          tap(loaded => {
            if (!loaded) {
              this.categoriesService.getAll()       // Sends http get request to the server and also store in the Store
            }
          }),
          filter(loaded => !!loaded),   // wait for data to be loaded in the store
          first() // observable wil be completed after emitting a first value
        );
    }
}

