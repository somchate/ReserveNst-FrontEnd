import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import  { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  private AUTH_HEADER = "Authorization";
  private token = "secrettoken";

  constructor(private inject: Injector) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<object>> {
    let authservice = this.inject.get(AuthService);
        req = req.clone({        
          headers: req.headers.set("Content-Type", "application/json")      
    });
    req = this.addAuthenticationToken(req);
    return next.handle(req)
  }
  
  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
    let authservice = this.inject.get(AuthService);   
    return request.clone({
      headers: request.headers.set(this.AUTH_HEADER, "Bearer " + authservice.getToken())
    });
  }
}