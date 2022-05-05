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
export class UserAuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | Promise<boolean> {
        let isAuthenticated: boolean | Promise<boolean>;
        if (localStorage.getItem('adminUser') && localStorage.getItem('user') == null) {
            this.router.navigate(['/admin/signin']);
        } else {
            if (this.authService.getJwtToken() && this.authService.getName() && this.authService.getName() != 'Admin') {
                isAuthenticated = true;
            }
            else if (!isAuthenticated) {
                this.router.navigate(['/timeout']);
                console.log('auth timeout');
            }
            return isAuthenticated;
        }
    }
}
