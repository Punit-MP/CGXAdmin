import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreditCardValidators } from 'angular-cc-library';
import { MessageService } from 'primeng/api';
import { CgxService } from '../services/cgx.service';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css']
})
export class AddCardComponent implements OnInit {
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
  public showNewPassword: boolean;
  public showPassword: boolean;
  public showConfirmPassword: boolean;
  cardNumberValue = '';
  cardNumberFlag = false;
  constructor(private cgxService: CgxService, private messageService: MessageService, private formBuilder: FormBuilder,
              private router: Router, ) {

    this.addcardForm = formBuilder.group({
      cardofType: ['', Validators.required],
      CardNumber: ['', [Validators.required, CreditCardValidators.validateCCNumber]],
      expDate: ['', [Validators.required, CreditCardValidators.validateExpDate]],
      securityCode: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]],
    });
    this.cardType = this.getCardType();
  }

  ngOnInit(): void {
    document.getElementById('cardofType').focus();
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
  get cardsinfo() {
    return this.addcardForm.controls;
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
      if (response.data.status == 200) {
        this.getUserDetails();
        this.messageService.add({ detail: response.data.msg });
        this.router.navigate(['/profileinformation']);
      }
      else {
        this.messageService.add({  detail: response.data.msg });
        this.router.navigate(['/add-card']);
      }
    }, err => {
      console.log('error', err?.data?.msg);
      this.messageService.add({ detail: 'Error has occured' });
      this.router.navigate(['/add-card']);
    });
  }
  checkCardNumber(value: string) {
    if (value == '') {
      this.cardNumberFlag = false;
    } else {
      this.cardNumberFlag = true;
    }
  }
  changeWebsite(e) {
    this.cardsTypevalue = e.target.value;
    // console.log(this.cardsTypevalue);
  }
}
