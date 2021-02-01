import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatchPassword } from '../../validators/match-password';
import { UniqueUsername } from '../../validators/unique-username';
import { UniqueId } from '../../validators/unique-id';
import { AuthService } from '../../services/auth.service';
import { CitiesService } from '../../services/cities.service';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { noop } from 'rxjs';
import { AppState } from '../../../../reducers';
import { register } from '../../ngrx/auth.actions';
import { City } from 'src/app/models/City';

import {
  ID_MIN_LENGTH,
  ID_MAX_LENGTH,
  STREET_MIN_LENGTH,
  STREET_MAX_LENGTH,
  HOUSE_MIN_LENGTH,
  HOUSE_MAX_LENGTH,
  FIRST_NAME_MIN_LENGTH,
  FIRST_NAME_MAX_LENGTH,
  LAST_NAME_MIN_LENGTH,
  LAST_NAME_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  EMAIL_REGEX
} from '../../validators/constValues';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isLoading: boolean = false;
  error: string = '';
  activeStepIndex: number = 1;
  cities: City[];
  
  registerForm = new FormGroup({
    id: new FormControl(
      '', 
      [
        Validators.required,
        Validators.minLength(ID_MIN_LENGTH),
        Validators.maxLength(ID_MAX_LENGTH)
      ], 
      [this.uniqueId.validate]
    ),  
    email: new FormControl(
      '', 
      [
        Validators.required,
        Validators.pattern(EMAIL_REGEX)
      ], 
      [this.uniqueUsername.validate]
    ),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(PASSWORD_MIN_LENGTH),
      Validators.maxLength(PASSWORD_MAX_LENGTH)
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(PASSWORD_MIN_LENGTH),
      Validators.maxLength(PASSWORD_MAX_LENGTH)
    ]),
    firstName: new FormControl(
      '', 
      [
        Validators.required,
        Validators.minLength(FIRST_NAME_MIN_LENGTH),
        Validators.maxLength(FIRST_NAME_MAX_LENGTH)
      ]
    ),
    lastName: new FormControl(
      '', 
      [
        Validators.required,
        Validators.minLength(LAST_NAME_MIN_LENGTH),
        Validators.maxLength(LAST_NAME_MAX_LENGTH)
      ]
    ), 
    city: new FormControl(
      '', 
      [
        Validators.required
      ]
    ),
    street: new FormControl(
      '', 
      [
        Validators.required,
        Validators.minLength(STREET_MIN_LENGTH),
        Validators.maxLength(STREET_MAX_LENGTH)
      ]
    ),
    house: new FormControl(
      '', 
      [
        Validators.required,
        Validators.minLength(HOUSE_MIN_LENGTH),
        Validators.maxLength(HOUSE_MAX_LENGTH)
      ]
    ),
    apartment: new FormControl(
      '', 
      [
        Validators.required
      ]
    ),
  }, 
  { validators: [this.matchPassword.validate] });  

  constructor(
    private matchPassword: MatchPassword, 
    private uniqueUsername: UniqueUsername,
    private uniqueId: UniqueId,
    private authService: AuthService,
    private citiesService: CitiesService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.citiesService.getCities().subscribe(
      response => this.cities = response.data,
      err => {
        this.error = err.error.error;
        setTimeout(() => {
          this.error = '';
        }, 4000);
      }
    );   
  }

  onNextBtnClick() {
    this.activeStepIndex++;
  }

  onPrevBtnClick() {
    this.activeStepIndex--;
  }

  onChangeCity(e) {
    this.registerForm.get('city').setValue(e.target.value);
  }

  onSubmit() {
    if(this.registerForm.invalid) {
      return;
    }

    this.isLoading = true;    
    this.authService.register(this.registerForm.value)
      .pipe(
        tap(response => {
          this.isLoading = false;
          this.store.dispatch(register({ user: response.data}));
          this.router.navigate(['/']); 
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



