import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppState } from 'src/app/reducers';
import { isAdminLoggedIn } from '../ngrx/auth.selectors';

@Injectable()
export class AuthAdminGuard implements CanActivate {
  constructor(
    private router: Router,
    private store: Store<AppState>
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store
      .pipe(
        select(isAdminLoggedIn),
        tap(adminLoggedIn => {
          if (!adminLoggedIn) {
            this.router.navigate(['/']);
          }
        })
      )
  }
}