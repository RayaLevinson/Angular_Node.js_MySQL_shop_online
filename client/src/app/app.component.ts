import { Component, OnInit } from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';

import { AppState } from './reducers';
import { AuthService } from './modules/auth/services/auth.service';
import { login } from './modules/auth/ngrx/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  error: string = '';
  isLoading = true;

  constructor(
    private router: Router,
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      switch (true) {
          case event instanceof NavigationStart: {
              this.isLoading = true;
              break;
          }

          case event instanceof NavigationEnd:
          case event instanceof NavigationCancel:
          case event instanceof NavigationError: {
              this.isLoading = false;
              break;
          }
          default: {
              break;
          }
      }
    });

    this.authService.getCurrentUser()
      .pipe(
        tap(response => {
          this.store.dispatch(login({ user: response.data}));
          if (response.data.role === 'admin') {
            this.router.navigate(['admin'], { queryParams: { category: '1' } });
          } else {
            this.router.navigate(['shopping'], { queryParams: { category: '1' } });
          }  
        })
      )
      .subscribe();
      
    localStorage.removeItem('backToShopWasPressed');
  }
}
