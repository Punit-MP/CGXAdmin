import { Component, OnInit } from '@angular/core';
import { CgxService } from '../services/cgx.service';
import { AuthService } from '../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-crunchboxdetails',
  templateUrl: './crunchboxdetails.component.html',
  styleUrls: ['./crunchboxdetails.component.css']
})
export class CrunchboxdetailsComponent implements OnInit {

  products: any = [];
  crunchdetails: any = [];
  currentUser: any;
  visibility: string;
  id: any = '';
  token: any = '';
  userData: any = [];
  // tslint:disable-next-line:no-shadowed-variable
  constructor(activatedRoute: ActivatedRoute, public CgxService: CgxService, private router: Router, private authService: AuthService) {
    activatedRoute.queryParams
      .subscribe((params) => {
        if (!params.id) {
          document.location.hash = '';
        } else {
          this.id = params.id;
          const tok = localStorage.getItem('token');
          if (params.id && params.token) {
            this.token = params.token;
            this.tokenVerification(this.token);
          } else if (params.token || tok) {
            this.CgxService.crunchboxDetailId(this.id).subscribe(res => {
              this.crunchdetails = res;
            });
          }else{
            document.location.hash = '';
          }
        }
      });
  }
  tokenVerification(authtoken) {
    this.CgxService.validateToken(authtoken).subscribe(res => {
      this.userData = res.result;
      localStorage.setItem('token', this.userData.token);
      localStorage.setItem('Email', this.userData.email);
      localStorage.setItem('user', this.userData.name);
      localStorage.setItem('UserID', this.userData.id.toString());
      localStorage.setItem('login-event', 'login' + Math.random());
      this.router.navigate(['/crunchboxdetails'], { queryParams: { id: this.id } });
    });

  }
  ngOnInit(): void {
    this.currentUser = localStorage.getItem('user');
    this.visibility = localStorage.getItem('visibility');
    // this.ps.userdetails(id).subscribe(res=> this.products =res);
  }
  signout() {
    this.authService.signout();
    this.router.navigate(['/signin']);
  }
  cartadded(crunchdata) {
    this.products = JSON.parse(localStorage.getItem('products') || '[]');
    // console.log("# of users: " + users.length);
    // Modifying
    /*   var user = {
           id: Math.floor(Math.random() * 1000000)
       };
      this.products.push(crunchdata);*/
    // Saving
    localStorage.setItem('products', JSON.stringify(crunchdata));
    // console.log(localStorage.getItem("products"));

  }
  // replaceAll(str, find, replace) {
  //   const escapedFind = find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
  //   return str.replace(new RegExp(escapedFind, 'g'), replace);
  // }
}


