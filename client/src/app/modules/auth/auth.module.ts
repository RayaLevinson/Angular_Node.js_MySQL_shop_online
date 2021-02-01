import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { GeneralInfoComponent } from './components/general-info/general-info.component';
import { AuthService } from './services/auth.service';
import { AuthUserGuard } from './guards/authUser.guard';
import { AuthAdminGuard } from './guards/authAdmin.guard';
import * as fromAuth from './ngrx/reducers';
import { authReducer } from './ngrx/reducers';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, HomeComponent, GeneralInfoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    SharedModule,
    CoreModule,
    StoreModule.forFeature(fromAuth.authFeatureKey, authReducer)
  ],
  exports: [LoginComponent]
})
export class AuthModule { 
  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        AuthService,
        AuthUserGuard,
        AuthAdminGuard
      ]
    }
  }
}
