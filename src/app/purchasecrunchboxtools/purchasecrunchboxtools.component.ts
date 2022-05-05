import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchasecrunchboxtools',
  templateUrl: './purchasecrunchboxtools.component.html',
  styleUrls: ['./purchasecrunchboxtools.component.css']
})
export class PurchasecrunchboxtoolsComponent implements OnInit {
  currentUser: any;
  constructor() { }

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('user');
    this.getUserDetails();
  }
  getUserDetails(){
  }
}
