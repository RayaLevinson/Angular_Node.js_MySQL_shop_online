import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AppState } from 'src/app/reducers';
import { AuthService } from '../../../../auth/services/auth.service';
import { isLoggedIn, userFirstName } from '../../../../auth/ngrx/auth.selectors';
import { PROJECT_NAME } from '../../../../../config/constants';
import { CONTACT_PHONE, CONTACT_EMAIL } from '../../../../../config/constants';
import { logout } from 'src/app/modules/auth/ngrx/auth.actions';
import { isUserLoggedIn } from '../../../../auth/ngrx/auth.selectors';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  isUserLoggedIn$: Observable<boolean>;
  userFirstName$: Observable<string>;
  projectName: string = PROJECT_NAME;
  phone: string = CONTACT_PHONE;
  email: string = CONTACT_EMAIL;
  
  constructor(
    private router: Router,
    private store: Store<AppState>,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.store
      .pipe(
        select(isLoggedIn)
      );

    this.userFirstName$ = this.store
      .pipe(
        select(userFirstName)
      );

    this.isUserLoggedIn$ = this.store
    .pipe(
      select(isUserLoggedIn)
    );
  }

  onLogout() {
    this.authService.logout()
      .pipe(
        tap(() => {
          this.store.dispatch(logout());

          this.isLoggedIn$ = this.store
          .pipe(
            select(isLoggedIn)
          )        
          
          this.router.navigate(['/']); 
        })
      )
      .subscribe();    
  } 
}
