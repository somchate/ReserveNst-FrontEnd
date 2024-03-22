import { Injectable } from '@angular/core';
const token = 'auth-token';
const refreshtoken = 'auth-refreshtoken';
const username = 'auth-user';
const roles = 'auth-roles';
const unitid = 'auth-unit';
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }
  signOut(): void {
    localStorage.clear();
  }
  public saveToken(token: string): void {
    localStorage.removeItem('token');
    localStorage.setItem('token', token);
  }
  public getToken(): string | null {
    return localStorage.getItem('token');
  }
  public saveRefreshToken(token: string): void {
    localStorage.removeItem('refreshtoken');
    localStorage.setItem('refreshtoken', token);
  }
  public getRefreshToken(): string | null {
    return localStorage.getItem('refreshtoken');
  }
  public saveUser(user: any): void {
    localStorage.removeItem('username');
    localStorage.setItem('username', JSON.stringify(user));
  }
  public getUser(): any {
    const user = localStorage.getItem('username');
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  public saveRole(roles: any): void {
    localStorage.removeItem('roles');
    localStorage.setItem('roles', JSON.stringify(roles));
  }
  public getRole(): any {
    const user = localStorage.getItem('roles');
    if (roles) {
      return JSON.parse(roles);
    }
    return {};
  }


  public saveName(firstName: any, lastName: any): void {
    localStorage.removeItem('name');
    localStorage.setItem('name', firstName + ' ' + lastName);
  }
  public getName(): any {
    const name = localStorage.getItem('name');
    if (name) {
      return JSON.parse(name);
    }
    return {};
  }

  public saveLastName(lastName: any): void {
    localStorage.removeItem('lastname');
    localStorage.setItem('lastname', lastName);
  }
  public getLastName(): any {
    const lastname = localStorage.getItem('lastname');
    if (lastname) {
      return JSON.parse(lastname);
    }
    return {};
  }

  public saveUnit(unit: any): void {
    localStorage.removeItem('unitid');
    localStorage.setItem('unitid', JSON.stringify(unit));
  }
  public getUnit(): any {
    return localStorage.getItem('unitid');
  }
}