import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree
} from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | Promise<boolean> {
            let isAuthenticated: boolean | Promise<boolean>;
            if (this.authService.getAdminToken() && this.authService.getAdminName() == 'Admin'){
            isAuthenticated = true;
        }
            if (!isAuthenticated) {
            this.router.navigate(['/admin/signin']);
        }
            return isAuthenticated;
    }
}
