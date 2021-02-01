import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { Observable, noop } from 'rxjs';
import { AppState } from '../../../../reducers';
import { AuthService } from '../../services/auth.service';
import { login } from '../../ngrx/auth.actions';
import { isUserLoggedIn, isAdminLoggedIn } from '../../ngrx/auth.selectors';

import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  EMAIL_REGEX
} from '../../validators/constValues';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading: boolean = false;
  error: string = '';
  isUserLoggedIn$: Observable<boolean>;
  loginForm = new FormGroup({
    email: new FormControl('',
      [
        Validators.required,
        Validators.pattern(EMAIL_REGEX)
      ]
    ),
    password: new FormControl('',
      [
        Validators.required,
        Validators.minLength(PASSWORD_MIN_LENGTH),
        Validators.maxLength(PASSWORD_MAX_LENGTH)
      ])
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store
    .pipe(
      select(isUserLoggedIn)
    )
    .subscribe(result => {
      if (result === true) {
        this.router.navigate(['shopping'], { queryParams: { category: '1' } });
        return;
      }
    });

    this.store
    .pipe(
      select(isAdminLoggedIn)
    )
    .subscribe(result => {
      if (result === true) {
        this.router.navigate(['admin'], { queryParams: { category: '1' } });
      }
    });
  }

  onSubmit() {
    if(this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.authService.login(this.loginForm.value)
      .pipe(
        tap(response => {
          this.isLoading = false;
          this.store.dispatch(login({ user: response.data}));
          if (response.data.role === 'admin') {
            this.router.navigate(['admin'], { queryParams: { category: '1' } });
          } else {
            this.router.navigate(['shopping'], { queryParams: { category: '1' } });
          }     
        })
      )
      .subscribe(
        noop,
        error => {
          this.error = error.error.error;
          this.isLoading = false;
          setTimeout(() => {
            this.error = '';
          }, 4000);
        }
    );
  }

}
