import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GetCities } from '../../../models/GetCities';
import { BASE_URL } from '../../../config/constants';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  rootUrl:string = `${BASE_URL}/api/cities`;

  constructor(private http:HttpClient) { }

  getCities(): Observable<GetCities> {
    return this.http.get<GetCities>(this.rootUrl, httpOptions);
  }

}
