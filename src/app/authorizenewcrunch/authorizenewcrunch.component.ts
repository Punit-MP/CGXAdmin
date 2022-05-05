import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter
} from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { CgxService } from '../services/cgx.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-authorizenewcrunch',
  templateUrl: './authorizenewcrunch.component.html',
  styleUrls: ['./authorizenewcrunch.component.css']
})
export class AuthorizenewcrunchComponent implements OnInit {
  @ViewChild('movieSearchInput', { static: true }) movieSearchInput: ElementRef;
  apiResponse: any;
  isSearching: boolean;
  b: any;
  users: any = [];
  token: any;
  crunch: any = [];
  currentUser: any;
  authtoken: any;
  userData: any = [];
  products: any = [];
  todos = [];
  notifications: any;
  unread: any;
  result: [];
  msg: any;
  searchFlag = true;
  SearchText = '';
  constructor(private activatedRoute: ActivatedRoute, private cgxService: CgxService, private router: Router,
              private authService: AuthService) {
    this.isSearching = false;
    this.apiResponse = [];

    // console.log(this.movieSearchInput);
  }

  ngOnInit(): void {

    // console.log(this.movieSearchInput);

    fromEvent(this.movieSearchInput.nativeElement, 'keyup').pipe(

      // get value
      map((event: any) => {
        return event.target.value;
      })
      // if character length greater then 2
      , filter(res => res.length > 2)

      // Time in milliseconds between key events
      , debounceTime(1000)

      // If previous query is diffent from current
      , distinctUntilChanged()

      // subscription for response
    ).subscribe((text: string) => {

      this.isSearching = true;

      this.cgxService.searchTool(text).subscribe((res1) => {
        // console.log('res', res1);
        this.isSearching = false;
        this.apiResponse = res1;
      }, (err) => {
        this.isSearching = false;
        console.log('error', err);
      });

    });
    this.authtoken = this.activatedRoute.snapshot.params.authtoken;
    if (this.authtoken != undefined) {
      this.token = this.activatedRoute.snapshot.params.authtoken;
      this.tokenVerificatio(this.token);
      // setTimeout(() => {
      //   document.location.hash = '';
      // }, 3000);
    }
    else {
      this.token = localStorage.getItem('token');
      this.getCrunch();
      this.currentUser = localStorage.getItem('user');
      // this.getNotification();
    }
  }

  getCrunch() {
    this.cgxService.authNewcrunchbox().subscribe(res => {
      this.crunch = res;
    });
  }
  // getNotification() {
  //   // console.log('getNotification')
  //   this.cgxService.getUserNotification().subscribe(res => {

  //     this.notifications = res.data;
  //     this.unread = res.data.unread;
  //     // console.log(this.unread);
  //   });

  // }
  tokenVerificatio(authtoken) {
    // console.log(authtoken);
    this.cgxService.validateToken(authtoken).subscribe(res => {
      this.userData = res.result;
      // console.log(this.userData);
      localStorage.setItem('token', this.userData.token);
      localStorage.setItem('Email', this.userData.email);
      localStorage.setItem('user', this.userData.name);
      localStorage.setItem('UserID', this.userData.id.toString());
      localStorage.setItem('login-event', 'login' + Math.random());
      document.location.hash = '';
    });

  }
  signout() {
    this.authService.signout();
    this.router.navigate(['/signin']);
  }

  crunchbox() {
    this.router.navigate(['/crunchbox']);
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
  setPurchased(value) {
    localStorage.setItem('visibility', value);
    console.log(localStorage);
  }
  updateNotify(data) {
    const dataNotification = {
      notification_id: data.notification_id,
      status: 1
    };
    // console.log(dataNotification);
    this.cgxService.updateUserNotification(dataNotification).subscribe(res => {

      console.log(res);
    });
  }
  /*onKeypressEvent(event){

    //console.log(event.target.value);
    this.cgxService.searchTool(event.target.value).subscribe(res=> {
     if(res.status==200){
      if(Object.keys(res.toolData).length >= 1)
      this.result = res.toolData;
      }
      else{
      //this.result=[];
      this.msg =res.Msg ;
      //this.result=[];

    }
    //console.log(this.result);
    });
  }*/

  onKeypressEvent(event) {

    this.cgxService.searchTool(event.target.value).subscribe(res => {

      this.result = res;


      console.log(this.result);
    });
  }
  /*searchGetCall(term: string) {
   if (term === '') {
     return of([]);
   }
   return this.httpClient.get('http://www.omdbapi.com/?s=' + term + '&apikey=' + APIKEY, { params: PARAMS.set('search', term) });
 }*/

  checkText(Value: any) {
    if (Value == '') {
      this.searchFlag = false;
      this.apiResponse.toolData = [];
      this.apiResponse.Msg = '';
    } else {
      this.searchFlag = true;
    }
  }
  getBoxIndex(i) {
    if (i == 1) {
      return true;
    }
    else if (i % 3 == 1) {
      return true;
    } else {
      return false;
    }
  }
}
