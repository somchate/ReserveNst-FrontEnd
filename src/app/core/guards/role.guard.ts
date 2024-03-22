import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isAuthorized(route);
  }

  private isAuthorized(route: ActivatedRouteSnapshot): boolean {
    // const role = ['Admin']
    const role = JSON.parse(localStorage.getItem('roles')!)
    const expectedRole = route.data['roles'];
    const roleMatches = role.findIndex((role: any) => expectedRole.indexOf(role) !== -1);
    return roleMatches < 0 ? false : true;
  }

}
