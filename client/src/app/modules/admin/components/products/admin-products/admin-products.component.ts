import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AdminProductsService } from '../../../services/admin-products.service';
import { Product } from '../../../../../models/Product';
import { BASE_URL } from '../../../../../config/constants';
import { MY_DOMAIN } from '../../../../../config/constants';
import { ONLINE_SITE } from '../../../../../config/constants';

@Component({
  selector: 'admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products: Product[] = [];
  isLoading: boolean = false;
  categoryId: number = 0;
  error:string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminProductsService: AdminProductsService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const catIdNumber = parseInt(params['category']);
      if (!isNaN(catIdNumber)) {
        if (this.categoryId !== catIdNumber) {          
          this.categoryId = catIdNumber;
          this.getProductsOfCategory(this.categoryId);
        }
      }
    });

    // Listen to new product that was added
    this.adminProductsService.productAdded?.subscribe(product => {
      this.products = [...this.products, product];
      if (product.categoryId !== this.categoryId) { // Navigate to the relevant category
        if (MY_DOMAIN === ONLINE_SITE) { 
          setTimeout(() => {
            this.router.navigate(['admin'], { queryParams: { category: product.categoryId } });
          }, 3250)
        } else {
          this.router.navigate(['admin'], { queryParams: { category: product.categoryId } });
        }
      }
    });

    // Listen to updated products
    this.adminProductsService.productChanged?.subscribe(product => {
      if (product.imagePath === '') { // means: use current imagePath
        this.products = this.products.map(curr => curr.id === product.id 
          ? { ...curr, name: product.name, price: product.price, categoryId: product.categoryId } 
          : curr
        )
      } else  { // means: use updated imagePath
        this.products = this.products.map(curr => curr.id === product.id 
          ? { ...curr, name: product.name, price: product.price, categoryId: product.categoryId, imagePath: product.imagePath } 
          : curr
        )
      }
      if (product.categoryId !== this.categoryId) { // Navigate to the relevant category
        this.router.navigate(['admin'], { queryParams: { category: product.categoryId } });
        this.getProductsOfCategory(product.categoryId);
      }
    });
  }
  
  getProductsOfCategory(categoryId) {
    this.isLoading = true;
    this.adminProductsService.getProducts(categoryId).subscribe({
      next: response => {
        this.products = response.data; 
        this.isLoading = false;
        this.products.forEach(product => product.imagePath = `${MY_DOMAIN}${BASE_URL}/${product.imagePath}`)
      },
      error: err => {
        this.isLoading = false;
        this.error = err.error.error;
        setTimeout(() => {
          this.error = '';
        },4000);
      }
    });
  }
}
