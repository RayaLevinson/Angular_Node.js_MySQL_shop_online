import { Injectable } from '@angular/core';
import { FormGroup, Validator, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MatchPassword implements Validator {

  /**
   * @description
   * Method that performs synchronous validation against the provided control.
   * @param control(formGroup / formControl) of type FormGroup or FormControl The control to validate against.
   * @returns A map of validation errors if validation fails,
   * otherwise null.
   */
  validate(formGroup: FormGroup): ValidationErrors | null {
    const { password, confirmPassword } = formGroup.value;

    if (password === confirmPassword) {
      return null; 
    } else {
      return { passwordsDontMatch: true }
    }
  }
}
