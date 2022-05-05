import { throwError as observableThrowError, Observable, BehaviorSubject, throwError } from 'rxjs';
import { take, filter, catchError, switchMap } from 'rxjs/operators';
import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    isRefreshingToken = false;
    tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    private refreshingInProgress: boolean;
    private accessTokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    constructor(private injector: Injector, private authSer: AuthService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let accessToken: any;
        if (localStorage.getItem('user')){
        accessToken = localStorage.getItem('token');
        }
        if (localStorage.getItem('adminUser') && window.location.href.indexOf('admin') != -1){
            accessToken = localStorage.getItem('adminToken');
        }

        return next.handle(this.addAuthorizationHeader(req, accessToken)).pipe(
            catchError(err => {
                // in case of 401 http error
                if (err instanceof HttpErrorResponse && err.status === 401) {
                    // get refresh tokens
                    const token = localStorage.getItem('token');
                    // if there are tokens then send refresh token request
                    // if (token && accessToken) {
                    //     return this.refreshToken(req, next);
                    // }
                    // otherwise logout and redirect to login page
                    return this.logoutUser();
                }

                // in case of 403 http error (refresh token failed)
                if (err instanceof HttpErrorResponse && err.status === 403) {
                    // logout and redirect to login page
                    return this.logoutUser();
                }
                // if error has status neither 401 nor 403 then just return this error
                return throwError(err);
            })
        );
    }

    private addAuthorizationHeader(request: HttpRequest<any>, token: string): HttpRequest<any> {
        if (token) {
            return request.clone({ withCredentials: true, setHeaders: { Authorization: token } });
        }

        return request;
    }

    // private refreshToken(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //     if (!this.refreshingInProgress) {
    //         this.refreshingInProgress = true;
    //         this.accessTokenSubject.next(null);

    //         return this.authSer.refreshToken().pipe(
    //             switchMap((res) => {
    //                 this.refreshingInProgress = false;
    //                 this.accessTokenSubject.next(res.token);
    //                 // repeat failed request with new token
    //                 return next.handle(this.addAuthorizationHeader(request, res.token));
    //             })
    //         );
    //     } else {
    //         // wait while getting new token
    //         return this.accessTokenSubject.pipe(
    //             filter(token => token !== null),
    //             take(1),
    //             switchMap(token => {
    //                 // repeat failed request with new token
    //                 return next.handle(this.addAuthorizationHeader(request, token));
    //             }));
    //     }
    // }

    addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
        return req.clone({ withCredentials: true, setHeaders: { Authorization: token } });
    }

    logoutUser() {
        this.authSer.signout();
        this.router.navigate(['/login']);
        return observableThrowError('');
    }
}
