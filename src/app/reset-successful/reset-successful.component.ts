import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-reset-successful',
  templateUrl: './reset-successful.component.html',
  styleUrls: ['./reset-successful.component.css']
})
export class ResetSuccessfulComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.clearLocalStorage();
  }

}
