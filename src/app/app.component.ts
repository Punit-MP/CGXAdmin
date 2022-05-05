import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cgxdev';
  constructor(private bnIdle: BnNgIdleService, private router: Router, private authService: AuthService) {
    this.bnIdle.startWatching(900).subscribe((res) => {
      // tslint:disable-next-line:no-unused-expression
      if (res) {-
            this.authService.signout();
                this.authService.adminSignout();
                if (window.location.href.indexOf('admin') != -1){
              this.router.navigate(['/admin']);
          }else{
            this.router.navigate(['/timeout']);
            console.log('app timeout');
          }
      }
    });
  }
}
