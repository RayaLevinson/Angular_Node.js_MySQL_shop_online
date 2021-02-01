import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable  } from 'rxjs';
import { map, first } from 'rxjs/operators';

import { CategoryEntityService } from '../../../services/category-entity.service';
import { Category } from '../../../../../models/Category';


@Component({
  selector: 'categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories$: Observable<Category[]>;
  categoryId: number = 0;


  constructor(
    private route: ActivatedRoute,
    private categoryEntityService: CategoryEntityService
  ) { }

  ngOnInit(): void {
    this.reload();
    this.route.queryParams.subscribe(params => {
      const catIdNumber = parseInt(params['category']);
      if (!isNaN(catIdNumber)) {
        if (this.categoryId !== catIdNumber) {          
          this.categoryId = catIdNumber;
        }
      }
    });
  }

  reload() {
    this.categories$ = this.categoryEntityService.entities$
      .pipe(
        map(val => val),
        first()
      )      
  }
}
