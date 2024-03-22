import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { LoginComponent } from 'src/app/login/login.component';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate() {
    if (this.authService.IsLoggedIn()) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}