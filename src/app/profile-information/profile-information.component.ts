import { Component, OnInit } from '@angular/core';
import { CgxService } from '../services/cgx.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreditCardValidators } from 'angular-cc-library';
import { AuthService } from '../auth/auth.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { OldPwdValidators } from './passwordvalidator';
@Component({
  selector: 'app-profile-information',
  templateUrl: './profile-information.component.html',
  styleUrls: ['./profile-information.component.css']
})
export class ProfileInformationComponent implements OnInit {
  public showBillingSection = false;
  public showchangePasswordSection = false;
  public showAccountInformationSection = true;
  submitted = false;
  submittedinfo = false;
  display = false;
  cardinfo = false;
  isShowDiv = false;
  currentUser: any;
  userDetails: any;
  cards = [];
  order = [];
  cardType: any;
  str: any;
  changeForm: FormGroup;
  cardsTypevalue: any;
  profileform: FormGroup;
  addcardForm: FormGroup;
  user: any = [];
  dateArray = [];
  userData: any = [];
  public showNewPassword: boolean;
  public showPassword: boolean;
  public showConfirmPassword: boolean;
  cardNumberValue = '';
  cardNumberFlag = false;
  constructor(private confirmationService: ConfirmationService, private cgxService: CgxService,
              private router: Router, formBuilder: FormBuilder, private messageService: MessageService, private authService: AuthService) {
    this.changeForm = formBuilder.group({
      currentpassword: ['', Validators.required],
      newpassword: ['', Validators.required],
      confirmpass: ['', Validators.required]
    }, {
      validator: OldPwdValidators.matchPwds
    });
    this.profileform = formBuilder.group({

      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      institution: ['', Validators.required]

    });

    this.addcardForm = formBuilder.group({
      cardofType: ['', Validators.required],
      CardNumber: ['', [Validators.required, CreditCardValidators.validateCCNumber]],
      expDate: ['', [Validators.required, CreditCardValidators.validateExpDate]],
      securityCode: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]],
    });
    this.cardType = this.getCardType();
  }
  get f() {
    return this.changeForm.controls;
  }
  get profile() {
    return this.profileform.controls;
  }
  get cardsinfo() {
    return this.addcardForm.controls;
  }
  ngOnInit(): void {
    this.currentUser = localStorage.getItem('user');
    this.getUserDetails();
    document.getElementById('firstName').focus();
  }

  changeToggle(showDivName) {
    if (showDivName == 'BillingSection') {
      this.showBillingSection = true;
      this.showchangePasswordSection = false;
      this.showAccountInformationSection = false;
    } else if (showDivName == 'ChangePassword') {
      this.showBillingSection = false;
      this.showchangePasswordSection = true;
      this.showAccountInformationSection = false;
    } else {
      this.showBillingSection = false;
      this.showchangePasswordSection = false;
      this.showAccountInformationSection = true;
    }

  }
  getUserDetails() {
    this.cgxService.userDetails().subscribe(res => {

      this.userDetails = res;
      // console.log(this.userDetails);
      this.cards = this.userDetails.data.cards;
      this.order = this.userDetails.data.orders;
      this.user = this.userDetails.data.result;
      console.log(this.user);
      // console.log(this.order);
    });

  }
  removeCard(cardID) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to remove this Card?',
      accept: () => {
        this.cgxService.deleteCard(cardID).subscribe(() => {
          this.messageService.add({ detail: 'Card Deleted Successfully' });
          this.getUserDetails();
        });
        // console.log('true');
      },
      reject: () => {
        this.messageService.add({detail: 'You have rejected'});
        //  this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
        // console.log('false');
     }
    });


  }

  onSubmit() {
    // debugger;
    this.submitted = true;
    // stop here if form is invalid
    if (this.changeForm.invalid) {
      return;
    }
    const data = {
      old_password: this.f.currentpassword.value,
      new_password: this.f.newpassword.value,
      confirm_password: this.f.confirmpass.value,
    };
    this.cgxService.changePassword(data).subscribe((response: any) => {
      // console.log(response);
      if (response.status == 403) {
        this.messageService.add({detail: response.msg });
        this.changeForm.reset();
      }
      else {
        this.messageService.add({ detail: response.msg });
        this.signout();
        this.router.navigate(['/changepassword']);
      }
    });
  }
  signout() {
    this.authService.signout();
  }
  profileSubmit() {
    // alert('ok');
    this.submittedinfo = true;
    // console.log(this.submittedinfo);
    // stop here if form is invalid
    if (this.profileform.invalid) {
      // console.log('m invalid');
      return;
    }
    const data = {
      first_name: this.profile.firstName.value,
      last_name: this.profile.lastName.value,
      email: this.profile.email.value,
      institution: this.profile.institution.value,
    };
    this.cgxService.updateProfile(data).subscribe((response: any) => {
      console.log(response);
      if (response.status == 200) {
        // this.messageService.add({ detail: 'Update Successful'});
        this.messageService.add({ detail: response.msg });
        this.updateUser();
      }
      else {
        this.messageService.add({ detail: response.msg });
      }
      // this.signout();
    });
  }
  getCardType() {
    return [
      { id: '001', name: 'Visa' },
      { id: '002', name: 'Mastercard' },
      { id: '003', name: 'American Express' },
      { id: '004', name: 'Discover' },
      { id: '005', name: 'Diners Club' },
    ];
  }
  changeWebsite(e) {

    this.cardsTypevalue = e.target.value;
    // console.log(this.cardsTypevalue);
  }
  cardSubmit() {
    this.dateArray = this.cardsinfo.expDate.value.split(' / ');
    this.str = this.cardsinfo.CardNumber.value;
    const cardnumber = this.str.replace(/\s+/g, '');
    this.cardinfo = true;
    if (this.addcardForm.invalid) {
      //  console.log('m invalid');
      return;
    }
    const data = {
      card_type: this.cardsinfo.cardofType.value,
      card_no: cardnumber,
      card_exp_month: this.dateArray[0],
      card_exp_year: this.dateArray[1],
    };
    this.cgxService.addCard(data).subscribe((response: any) => {
      console.log(response.data.msg);
      this.getUserDetails();
      if (response.status == 200) {
        this.messageService.add({  detail: response.data.msg });
      }
      else {
        this.messageService.add({ key: 'resetKey', detail: response.data.msg });
      }
      // this.signout();
    });
  }
  toggleDisplayDiv() {
    this.isShowDiv = !this.isShowDiv;
  }
  checkCardNumber(value: string) {
    if (value == '') {
      this.cardNumberFlag = false;
    } else {
      this.cardNumberFlag = true;
    }
  }
  updateUser(){
    const tok = localStorage.getItem('token');
    this.cgxService.validateToken(tok).subscribe(res => {
      this.userData = res.result;
      localStorage.setItem('token', this.userData.token);
      localStorage.setItem('Email', this.userData.email);
      localStorage.setItem('user', this.userData.name);
      localStorage.setItem('UserID', this.userData.id.toString());
      localStorage.setItem('login-event', 'login' + Math.random());
      window.location.reload();
    });
  }
}
