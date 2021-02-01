import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityMetadataMap, EntityDefinitionService, EntityDataService } from '@ngrx/data';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './components/categories/categories/categories.component';
import { CategoryEntityService } from './services/category-entity.service';
import { CategoriesDataService } from './services/categories-data.service';
import { CategoriesResolver } from './services/categories.resolver';

const entityMetadata: EntityMetadataMap = {
  Category: {
  }
}

@NgModule({
  declarations: [CategoriesComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule   
  ],
  exports: [CategoriesComponent],
  providers: [
    CategoryEntityService,
    CategoriesDataService,
    CategoriesResolver
  ]
})
export class CategoriesModule { 
  constructor(
    private eds: EntityDefinitionService,
    private entityDataService: EntityDataService,
    private categoriesDataService: CategoriesDataService
  ) {
    eds.registerMetadataMap(entityMetadata);
    entityDataService.registerService('Category', categoriesDataService)
  }
}
