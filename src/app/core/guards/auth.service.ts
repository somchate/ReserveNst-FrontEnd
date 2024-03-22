import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogin = false;

  roleAs!: string;

  constructor() { }

  IsLoggedIn() {
    // return !!localStorage.getItem('token');

    const loggedIn = localStorage.getItem('token');
    if (loggedIn)
      this.isLogin = true;
    else
      this.isLogin = false;
    return this.isLogin;
  }

  getRole() {
    this.roleAs = JSON.parse(localStorage.getItem('role')!);
    return this.roleAs;
  }
}
