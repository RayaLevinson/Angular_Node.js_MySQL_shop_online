import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { InputComponent } from './components/formControls/input/input.component';
import { ProductItemComponent } from './components/product/product-item/product-item.component';
import { AboutComponent } from './components/about/about.component';
import { ProductService } from './services/product.service';
import { InputControlService } from './services/input-control.service';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [SidebarComponent, InputComponent, ProductItemComponent, AboutComponent, ModalComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    SidebarComponent, 
    InputComponent, 
    ProductItemComponent,
    AboutComponent,
    ModalComponent
  ],
  providers: [
    ProductService,
    InputControlService
  ]
})
export class SharedModule { }
