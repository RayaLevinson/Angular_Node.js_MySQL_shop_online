import { Component, OnInit, Input } from '@angular/core';

import { ProductService } from '../../../services/product.service';
import { Product } from '../../../../../models/Product';
import { CartItemsEntityService } from '../../../../shopping/services/cart/cart-items-entity.service';

@Component({
  selector: 'product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  @Input() showShoppingActions: boolean;
  @Input() changeQuantityFunc: (args: Product) => void;
  modalOpen: boolean = false;

  constructor(
    private productService: ProductService,
    private cartItemsEntityService: CartItemsEntityService,
  ) { }

  ngOnInit(): void {
  }

  updateCart(product, units) {    
    const cartItem = {
      productId: product.id,
      quantity: units,
      itemPrice: product.price,
      name: product.name,
      imagePath: product.imagePath    
    }

    this.cartItemsEntityService.add(cartItem);
  }

  // Used for Admin update product
  onEditProduct(product) {
    this.productService.selectedProductToEdit$.emit(product);
  }

  onModalClick() {
    this.modalOpen = !this.modalOpen;
  }

  quanityChanged(quantity: number) {
    this.updateCart(this.product, quantity);    
  }
}
