import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BASE_URL } from '../../../config/constants';
import { MY_DOMAIN } from '../../../config/constants';

@Injectable({
  providedIn: 'root'
})
export class FinishOrderService {

  constructor(private http:HttpClient) { }

  public download(fileName: string): void {
    const fileToDownload = `${MY_DOMAIN}${BASE_URL}/${fileName}`
    this.http.get(fileToDownload, { responseType: 'blob'}).subscribe(res => {
      const downloadURL = window.URL.createObjectURL(res);
      const link = document.createElement('a');
      link.href = downloadURL;
      link.download = fileToDownload;
      link.click();
    });
  }
}
