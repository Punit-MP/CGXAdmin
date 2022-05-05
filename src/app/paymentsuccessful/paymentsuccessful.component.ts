import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
@Component({
  selector: 'app-paymentsuccessful',
  templateUrl: './paymentsuccessful.component.html',
  styleUrls: ['./paymentsuccessful.component.css']
})
export class PaymentsuccessfulComponent implements OnInit {
  currentUser: any;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('user');
  }
  signout() {
    this.authService.signout();
    this.router.navigate(['/signin']);
  }

}
