import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';

import { CartItem } from '../../../../models/CartItem';

@Injectable()
export class CartItemsEntityService 
  extends EntityCollectionServiceBase<CartItem> {

    constructor(
      serviceElementsFactory:   EntityCollectionServiceElementsFactory) {

        super('CartItem', serviceElementsFactory);
      }
}