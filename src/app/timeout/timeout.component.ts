import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-timeout',
  templateUrl: './timeout.component.html',
  styleUrls: ['./timeout.component.css']
})
export class TimeoutComponent implements OnInit {

  constructor(private router: Router) {
    if (localStorage.getItem('token')){
      this.router.navigate(['authorizenewcrunch']);
    }
  }

  ngOnInit(): void {
  }

}
