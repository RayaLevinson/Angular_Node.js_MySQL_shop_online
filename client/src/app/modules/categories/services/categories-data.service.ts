import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { Category } from '../../../models/Category';
import { BASE_URL } from '../../../config/constants';

@Injectable()
export class CategoriesDataService extends DefaultDataService<Category> {
  rootUrl: string = `${BASE_URL}/api/categories`;

    constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
      super('Category', http, httpUrlGenerator);
    }

    // Override default method
    getAll(): Observable<Category[]> {
      return this.http.get(this.rootUrl)
        .pipe(
          map(response => response['data'])
        );
    }
}