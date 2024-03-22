import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { throwError, Observable, BehaviorSubject, of, finalize } from 'rxjs';
import { catchError, filter, take, switchMap, retry } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  private AUTH_HEADER = 'Authorization';
  private token = 'secrettoken';
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private inject: Injector, private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<object>> {
    // console.log("this request url :"+req.url);
     req = req.clone({
      headers: req.headers.set('Content-Type', 'application/json'),
    });

    console.log("req url ->"+ req.url)
    req = this.addAuthenticationToken(req);

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let authservice = this.inject.get(AuthService);
        if (error && error.status === 401 && authservice.getToken()) {
          // console.log("test if error")
          return this.handle401Error(req, next);
        }
        return throwError(() => error);
      })
    ) as Observable<HttpEvent<object>>;
  }

  private refreshAccessToken(): Observable<any> {
    let authservice = this.inject.get(AuthService);
    authservice.processLogin('test');
    return of('secret token');
  }

  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
    // If we do not have a token yet then we should not set the header.
    // Here we could first retrieve the token from where we store it.
    let authservice = this.inject.get(AuthService);
    // If you are calling an outside domain then do not add the token.
    console.log('this request url :' + request.url);

    return request.clone({      
      headers: request.headers.set(
        this.AUTH_HEADER,
        'Bearer ' + authservice.getToken()
      ),
    });
    
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      const refreshtoken = this.authService.getRefreshToken();
      const accesstoken = this.authService.getToken();

      if (refreshtoken)
        return this.authService.processRefreshLogin(refreshtoken).pipe(
          switchMap((token: any) => {
            this.isRefreshing = false;
            this.authService.saveToken(token.accessToken, token.refreshToken);
            this.refreshTokenSubject.next(token);

            return next.handle(this.addAuthenticationToken(request));
          }),
          catchError((err) => {
            this.isRefreshing = false;

            // this.tokenService.signOut();
            return throwError(() => err);
          })
        );
    }
    return this.refreshTokenSubject.pipe(
      filter((token) => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addAuthenticationToken(request)))
    );
  }
}
