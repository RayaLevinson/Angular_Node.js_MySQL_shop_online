import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppState } from 'src/app/reducers';
import { isUserLoggedIn } from '../ngrx/auth.selectors';

@Injectable()
export class AuthUserGuard implements CanActivate {
  constructor(
    private router: Router,
    private store: Store<AppState>
  ) {}

  canActivate(): Observable<boolean> {
    return this.store
      .pipe(
        select(isUserLoggedIn),
        tap(userLoggedIn => {
          if (!userLoggedIn) {
            this.router.navigate(['/']);
          }
        })
      )
  }
}