import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { LoaderComponent } from './components/layout/loader/loader.component';

@NgModule({
  declarations: [NavbarComponent, LoaderComponent],
  imports: [
    CommonModule,
    CoreRoutingModule
  ],
  exports: [NavbarComponent, LoaderComponent]
})
export class CoreModule { }
