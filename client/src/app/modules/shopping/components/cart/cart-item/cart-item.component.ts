import { Component, OnInit, Input } from '@angular/core';

import { CartItemsEntityService } from '../../../services/cart/cart-items-entity.service';
import { CartItem } from '../../../../../models/CartItem';
import { BASE_URL } from '../../../../../config/constants';
import { MY_DOMAIN } from '../../../../../config/constants';

@Component({
  selector: 'cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  @Input() item: CartItem;
  baseUrl: string = BASE_URL;
  myDomain: string = MY_DOMAIN;
  @Input() isCartEditable: boolean = false;
  @Input() productToSearch: string = '';

  constructor(private cartItemsEntityService: CartItemsEntityService) { }

  ngOnInit(): void {
  }

  onDelete(item) {
    this.cartItemsEntityService.delete(item.id);
  }
}
