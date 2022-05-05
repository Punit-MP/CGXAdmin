import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { AuthService } from './auth.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.currentUserValue;
    if (this.authService.isLoggedInUser()) {
      return true;
     // this.router.navigate(['dashboard']);
    }
    else{
      return false;
    }
   // return !this.authService.isLoggedInUser();
  }
}
