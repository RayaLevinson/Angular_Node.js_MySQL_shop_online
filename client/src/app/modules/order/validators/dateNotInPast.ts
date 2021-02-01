import { Injectable } from '@angular/core';
import { FormControl, Validator, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DateNotInPast implements Validator {

  /**
   * @description
   * Method that performs async validation against the provided control.
   * @param control The control to validate against.
   * @returns An observable that resolves a map of validation errors if validation fails, 
   * otherwise null.
   */
  validate(control: FormControl): ValidationErrors | null {
    const { value } = control;
    
    const today = new Date().setHours(0,0,0,0);

    const selectedDate = new Date(value).setHours(0,0,0,0);

    if (selectedDate >= today) {
      return null; 
    } else {
      return ({ dateIsInPast: true });
    }
  }
}
