import { AbstractControl } from '@angular/forms';
import { Observable, Observer } from 'rxjs';

export const mineType = (control: AbstractControl): Observable<{ [key: string]: any }> => {
  const file = control.value as File;
  const fileReader = new FileReader();
  const frObs = new Observable((observer: Observer<{ [key: string]: any }>) => {
    fileReader.addEventListener("loadend", () => {
      const arr = new Uint8Array(fileReader.result as ArrayBuffer).subarray(0, 4);
      let header = '';
      let isValid = false;

      for(let i=0; i<arr.length; i++) {
        header += arr[i].toString(16); // convert to hexadecimal values
      }
      switch (header) {
        case "89504e47":     // png
          isValid = true;
          break;
        case "ffd8ffe0":     // jpg, jpeg
        case "ffd8ffe1":
        case "ffd8ffe2":
        case "ffd8ffe3":
        case "ffd8ffe8":
          isValid = true;
          break;
        case "47494638":      // gif
          isValid = true;
          break;
        default:
          isValid = false; // Or you can use the blob.type as fallback
          break;
      }
      if(isValid) {
        observer.next(null); // there are no errors
      } else {
        observer.next({invalidMimeType: true}); 
      }
      observer.complete();
    });
    fileReader.readAsArrayBuffer(file);
  });  
  return frObs;
};
