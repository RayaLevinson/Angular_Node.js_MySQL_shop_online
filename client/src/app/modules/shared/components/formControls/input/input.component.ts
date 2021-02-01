import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { InputControlService } from '../../../services/input-control.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  @Input() label: string;
  @Input() control: FormControl;
  @Input() inputType: string; // used for password
  
  constructor(private inputControlService: InputControlService) { }

  ngOnInit(): void {
  }

  showErrors() {
    const { touched, errors } = this.control;

    return touched && errors;
  }

  onDoubleClick() {
    if (this.label === 'Street *' || this.label === 'House *' || this.label === 'Apartment *') {
      this.inputControlService.doubleClickWasPressed$.emit(true);
    }
  }
}
