import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {
  currentUser: string;
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('adminUser');
    this.currentUser = this.currentUser[0].toUpperCase() + this.currentUser.slice(1);
  }

  signout() {
    this.authService.adminSignout();
    this.router.navigate(['/admin']);
  }

}
