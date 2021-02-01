import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable  } from 'rxjs';
import { Category } from '../../../../../models/Category';
import { mineType } from '../../../validators/image/mime-type';
import { ProductService } from '../../../../shared/services/product.service';
import { CategoryEntityService } from '../../../../categories/services/category-entity.service';
import { AdminProductsService } from '../../../services/admin-products.service';
import {
  PRODUCT_NAME_MIN_LENGTH,
  PRODUCT_NAME_MAX_LENGTH,
  PRODUCT_PRICE_MIN
} from '../../../validators/constValues';

@Component({
  selector: 'admin-products-form',
  templateUrl: './admin-products-form.component.html',
  styleUrls: ['./admin-products-form.component.css']
})
export class AdminProductsFormComponent implements OnInit {
  isEdit: boolean = false;
  currProductId: number = 0;
  isLoading: boolean = false;
  categories$: Observable<Category[]>;
  imagePreviewUrl: string = null;
  commentOnFile: string = "Please use .jpeg, .jpg, .png, .gif files only.";
  currFileName: string = 'Choose file...';
  error:string = '';
  productForm = new FormGroup({
    name: new FormControl('',
      [
        Validators.required,
        Validators.minLength(PRODUCT_NAME_MIN_LENGTH),
        Validators.maxLength(PRODUCT_NAME_MAX_LENGTH)
      ]
    ),
    price: new FormControl('',
      [
        Validators.required,
        Validators.min(PRODUCT_PRICE_MIN)
      ]
    ),
    image: new FormControl('',
      Validators.required
    ), 
    categoryId: new FormControl('',
      [
        Validators.required
      ]  
    )
  });

  constructor(
    private adminProductsService: AdminProductsService,
    private categoryEntityService: CategoryEntityService,
    private commonProductService: ProductService
  ) { }

  ngOnInit(): void {
    this.categories$ = this.categoryEntityService.entities$

    // Product to edit was selected
    this.commonProductService.selectedProductToEdit$?.subscribe(product => {
      this.isEdit = true;
      this.currProductId = product.id;
      this.commentOnFile = 'Please use .jpeg, .jpg, .png, .gif files only. Current image will be used if new one would not be supplied.';
      this.productForm.get('name').patchValue(product.name);
      this.productForm.get('price').patchValue(product.price);
      this.productForm.get('categoryId').patchValue(product.categoryId);
      this.productForm.get('image').setValidators(null);
      this.productForm.get('image').updateValueAndValidity();
    });
  }

  onFileChanged(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.productForm.patchValue({ image: file });
    if (file) {
      this.currFileName = file.name;
      this.productForm.get('image').setValidators(this.setRequired());
      this.productForm.get('image').setAsyncValidators(mineType);
      this.productForm.get('image').updateValueAndValidity(); 
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviewUrl = reader.result as string;
      }
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {   
    if(this.productForm.invalid) {
      return;
    }

    const productData = new FormData();
    productData.append('name', this.productForm.value.name);
    productData.append('price', this.productForm.value.price);
    productData.append('categoryId', this.productForm.value.categoryId);

    const newOrUpdatedProduct = {
      id: this.currProductId,
      name: this.productForm.value.name,
      price: this.productForm.value.price,
      imagePath: '', 
      categoryId: this.productForm.value.categoryId
    }

    this.isLoading = true;
    if (this.isEdit) {
      if (this.productForm.value.image) {
        productData.append('image', this.productForm.value.image);
        newOrUpdatedProduct.imagePath = this.imagePreviewUrl;  
      } 

      this.adminProductsService.productChanged.emit(newOrUpdatedProduct);
      this.adminProductsService.updateProduct(productData, this.currProductId).subscribe({
        next: response => {
          this.afterValidResponse();
        },
        error: err => {
          this.isLoading = false;
          this.error = err.error.error;
          setTimeout(() => {
            this.error = '';
          },4000);
        }
      }) 
    } else {
        productData.append('image', this.productForm.value.image); // 'image' is what specified in the server file 

        newOrUpdatedProduct.imagePath = this.imagePreviewUrl;  

        this.adminProductsService.addProduct(productData).subscribe({
          next: response => {
            newOrUpdatedProduct.id = response.data.id;
            this.adminProductsService.productAdded.emit(newOrUpdatedProduct);
            this.afterValidResponse();
          },
          error: err => {
            this.isLoading = false;
            this.error = err.error.error;
            setTimeout(() => {
              this.error = '';
            },4000);
          }
        })
    }
  }

  setRequired() {
    return [Validators.required];   
  }

  afterValidResponse() {
    this.isLoading = false;
    this.isEdit = false;
    this.productForm.reset();
    this.currFileName = 'Choose file...';
    this.currProductId = 0;
    this.imagePreviewUrl = null;
    this.commentOnFile = "Please use .jpeg, .jpg, .png, .gif files only.";
    this.productForm.get('image').setValidators(this.setRequired());
    this.productForm.get('image').setAsyncValidators(null);
    this.productForm.get('image').updateValueAndValidity();
  }
}
