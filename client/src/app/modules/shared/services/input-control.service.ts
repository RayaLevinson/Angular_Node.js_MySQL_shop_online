import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InputControlService {
  doubleClickWasPressed$: EventEmitter<boolean> = new EventEmitter();

  constructor() { }
}
