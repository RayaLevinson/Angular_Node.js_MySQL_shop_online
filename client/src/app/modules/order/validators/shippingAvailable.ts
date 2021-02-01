import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FormControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { map, catchError } from 'rxjs/operators';
import { OrderService } from '../services/order.service';

@Injectable({
  providedIn: 'root'
})
export class ShippingAvailable implements AsyncValidator {
  constructor(private orderService: OrderService) {}

  /**
   * @description
   * Method that performs async validation against the provided control.
   * @param control The control to validate against.
   * @returns An observable that resolves a map of validation errors if validation fails, 
   * otherwise null.
   */
  validate = (control: FormControl): Observable<ValidationErrors | null> => {
    const { value } = control;
    
    return this.orderService.shippingAvailable(value)
    .pipe(
      map(response => {
        return null; // Since the responce status is 200, username is available
      }),
      catchError(err => {
        if (err.error.available == false) {
          return of({ shippingIsNotAvailable: true });
        } else {
          return of({ someError: true })
        }
      })
    );
  };
}
