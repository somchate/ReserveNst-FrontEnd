import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { API_URL } from '../constants/api.constant';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  // For tomcat on intellij
  apiurl = API_URL.log_verify + '/v1/auth/';

  // For tomcat on localhost
  // apiurl = 'http://localhost:8442/logbackend/api/auth/';
  // errorMessage= null;

  // apiurl='https://localhost:7373/api/Auth/login/';

  // apiurl = 'https://172.32.43.13/VerificationLogApi/api/Auth/login';

  constructor(private http: HttpClient) { }

  processLogin(usercred: any) {
    return this.http.post(this.apiurl + 'signin', usercred);
  }

  processRefreshLogin(refreshtoken: any) {
    return this.http.post(this.apiurl + 'refreshtoken', { "refreshToken": refreshtoken });
  }

  getAuthorizationToken() {
    const currentUser = localStorage.getItem('token');
    return currentUser;
  }

  getToken() {
    return localStorage.getItem('token') || '';
  }

  getRefreshToken() {
    return localStorage.getItem('refreshtoken') || '';
  }

  saveToken(token: any, refreshtoken: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('refreshtoken', refreshtoken);
  }

}
