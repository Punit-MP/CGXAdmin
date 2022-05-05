import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { catchError, tap, map, delay, share } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Token, Result, ApplicationUser } from './models/token';
import { Router } from '@angular/router';
import { Message } from '../models/cgxModel';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  isLoggedIn = false;
  private loggedUser: string;
  email: string;
  password: string;
  private timer: Subscription;
  // tslint:disable-next-line:variable-name
  private _user = new BehaviorSubject<ApplicationUser>(null);
  user$: Observable<ApplicationUser> = this._user.asObservable();

  private currentUserSubject: BehaviorSubject<Message>;
  public currentUser: Observable<Message>;
  timerSub: Subscription;
  userSubject: BehaviorSubject<Token>;
  response: Response;
  token: Token;
  // tslint:disable-next-line:variable-name
  device_token: string;
  // tslint:disable-next-line:variable-name
  user_id: number;

 private storageEventListener(event: StorageEvent) {
    if (event.storageArea === localStorage) {
      if (event.key === 'logout-event') {
        this._user.next(null);
      }
      if (event.key === 'login-event') {
        location.reload();
      }
    }
  }

  constructor(private httpClient: HttpClient, private messageService: MessageService, private router: Router) {
    window.addEventListener('storage', this.storageEventListener.bind(this));
    this.currentUserSubject = new BehaviorSubject<Message>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Message {
    return this.currentUserSubject.value;
  }

  loginUser(user: { email: string, password: string }): Observable<boolean> {
   // debugger;
    return this.httpClient.post<any>(`${environment.cgxApiUrl}/user/login`, user)
      .pipe(
        map((userLogin) => {
          this._user.next({
            email: userLogin.email,
            token: userLogin.token
          });
         // debugger;
          this.setLocalStorage(userLogin);
          return userLogin;
        }),
        catchError(error => {
          this.messageService.add({ key: 'loginKey', detail: 'Incorrect email or password' });
          return of(false);
        }));
  }

  ngOnDestroy(): void {
    window.removeEventListener('storage', this.storageEventListener.bind(this));

    if (this.timer) {
      this.timer.unsubscribe();
    }
    this.router.navigate(['./signin']);
  }

  isLoggedInUser() {
    return !!this.getJwtToken();
  }

 getJwtToken() {
    return localStorage.getItem('token');
  }

  doLoginUser(email: string, token: Token) {
    this.loggedUser = email;
    this.setLocalStorage(token);
  }

  getName() {
    return localStorage.getItem('user');
  }

  getEmail() {
    return localStorage.getItem('Email');
  }

  getUserID() {
    return localStorage.getItem('UserID');
  }

  getAdminToken() {
    return localStorage.getItem('adminToken');
  }
  getAdminName() {
    return localStorage.getItem('adminUser');
  }

  getAdminEmail() {
    return localStorage.getItem('adminEmail');
  }

  getAdminID() {
    return localStorage.getItem('adminID');
  }




  signout() {
    this.clearLocalStorage();
    this._user.next(null);
    this.router.navigate(['/login']);
  }

  adminSignout() {
    this.adminClearLocalStorage();
    this._user.next(null);
    this.router.navigate(['/login']);
  }

  private setLocalStorage(token: Token) {
    if (token.result.name != 'Admin'){
      localStorage.setItem('token', token.result.token);
      localStorage.setItem('Email', token.result.email);
      localStorage.setItem('user', token.result.name);
      localStorage.setItem('UserID', token.result.id.toString());
      localStorage.setItem('login-event', 'login' + Math.random());
      localStorage.removeItem('currentUser');
    }else{
      localStorage.setItem('adminToken', token.result.token);
      localStorage.setItem('adminEmail', token.result.email);
      localStorage.setItem('adminUser', token.result.name);
      localStorage.setItem('adminID', token.result.id.toString());
      localStorage.setItem('login-event', 'login' + Math.random());
      localStorage.removeItem('currentUser');
    }
  }


  clearLocalStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('Email');
    localStorage.removeItem('UserID');
    localStorage.removeItem('login-event');
    localStorage.setItem('logout-event', 'logout' + Math.random());
  }

  adminClearLocalStorage() {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    localStorage.removeItem('adminUser');
    localStorage.removeItem('adminID');
    localStorage.removeItem('login-event');
    localStorage.setItem('logout-event', 'logout' + Math.random());
  }

  private getTokenRemainingTime() {
    const accessToken = localStorage.getItem('token');
    if (!accessToken) {
      return 0;
    }
    const token = JSON.parse(atob(accessToken.split('.')[1]));
    const expires = new Date(token.exp * 1000);
    return expires.getTime() - Date.now();
  }

  private stopTokenTimer() {
    if (this.timerSub) {
      this.timerSub.unsubscribe();
    }
  }

}
