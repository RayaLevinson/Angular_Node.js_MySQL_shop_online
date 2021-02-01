import { Component, OnInit, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Output() closeModal = new EventEmitter();
  @Output() updatedQuantityEvent = new EventEmitter<number>();
  updateCartForm = new FormGroup({
    quantity: new FormControl('1', [
      Validators.required,
      Validators.min(1)
    ])
  });

  constructor(private el: ElementRef) { // el is represents this modal component
  }

  ngOnInit(): void { // here we have an access to a parent component
    document.body.appendChild(this.el.nativeElement); // display the modal as a part of the body! element
  }

  ngOnDestroy(): void { // here we have an access to a parent component
    this.el.nativeElement.remove(); // remove this element from the DOM
  }

  onCloseClick() {
    this.closeModal.emit();
  }

  onSubmit() {
    const updatedQuantity = this.updateCartForm.get('quantity').value;
  
    if (updatedQuantity > 0) {
      this.closeModal.emit();
      this.updatedQuantityEvent.emit(updatedQuantity);
    }
  }

}

