import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Credentials } from '../../../models/Credentials';
import { LoginResponse } from '../../../models/LoginResponse';
import { LogoutResponse } from '../../../models/LogoutResponse';
import { UsernameAvailableResponse } from '../../../models/UsernameAvailableResponse';
import { IdAvailableResponse } from '../../../models/IdAvailableResponse';
import { BASE_URL } from '../../../config/constants';
import { User } from '../../../models/User';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  rootUrl:string = `${BASE_URL}/api/users/auth`;

  constructor(private http:HttpClient) { }

  login(credentials: Credentials):Observable<LoginResponse> {
    const currUrl = `${this.rootUrl}/login`;

    return this.http.post<LoginResponse>(currUrl, credentials, httpOptions);
  }

  logout():Observable<LogoutResponse> {
    const currUrl = `${this.rootUrl}/logout`;

    return this.http.get<LogoutResponse>(currUrl, httpOptions);
  }

  getCurrentUser():Observable<LoginResponse> {
    const currUrl = `${this.rootUrl}/current`;

    return this.http.get<LoginResponse>(currUrl, httpOptions);
  }
  
  register(user: User):Observable<LoginResponse> {
    const currUrl = `${BASE_URL}/api/users`;

    return this.http.post<LoginResponse>(currUrl, user, httpOptions);
  }

  usernameAvailable(username: string):Observable<UsernameAvailableResponse> {
    const currUrl = `${this.rootUrl}/username/${username}`;

    return this.http.get<UsernameAvailableResponse>(currUrl, httpOptions);
  }

  idAvailable(id: string):Observable<IdAvailableResponse> {
    const currUrl = `${this.rootUrl}/id/${id}`;

    return this.http.get<IdAvailableResponse>(currUrl, httpOptions);
  }

}
