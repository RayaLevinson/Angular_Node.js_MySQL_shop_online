import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FormControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UniqueUsername implements AsyncValidator {
  constructor(private authService: AuthService) {}

  /**
   * @description
   * Method that performs async validation against the provided control.
   * @param control The control to validate against.
   * @returns An observable that resolves a map of validation errors if validation fails, 
   * otherwise null.
   */
  validate = (control: FormControl): Observable<ValidationErrors | null> => {
    const { value } = control;
    
    return this.authService.usernameAvailable(value)
    .pipe(
      map(response => {
        return null; // Since the responce status is 200, username is available
      }),
      catchError(err => {
        if (err.error.available == false) {
          return of({ nonUniqueUsername: true });
        } else {
          return of({ someError: true })
        }
      })
    );
  };
}
