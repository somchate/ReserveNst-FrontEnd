import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IsloginService {

  islogin : boolean = false;

  constructor() { }

  isLoginStatus() {

    if (localStorage.getItem("token")) {
      return true;
    } else {
      return false;
    }
    
  }

}
