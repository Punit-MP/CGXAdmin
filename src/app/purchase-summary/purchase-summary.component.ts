import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { CgxService } from '../services/cgx.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreditCardValidators } from 'angular-cc-library';
import { MessageService, ConfirmationService } from 'primeng/api';
@Component({
  selector: 'app-purchase-summary',
  templateUrl: './purchase-summary.component.html',
  styleUrls: ['./purchase-summary.component.css'],
  providers: [ConfirmationService]
})
export class PurchaseSummaryComponent implements OnInit {
  currentUser: any;
  purchasform: FormGroup;
  submitted = false;
  cardType = [];
  cardsTypevalue: any;
  countryValue: any;
  countryId: any;
  myArray = [];
  str: any;
  productdetail: any;
  saveUsername = 0;
  countryListAllIsoData: any;
  stateList: any;
  cardNumberValue = '';
  cardNumberFlag = false;
  paymentFlag = false;
  constructor(private confirmationService: ConfirmationService, private router: Router, public cgxService: CgxService,
              private authService: AuthService, private messageService: MessageService, private formBuilder: FormBuilder) {
    this.cardType = this.getCardType();
    // console.log(this.cardType);
  }

  ngOnInit(): void {
    this.getCountry();
    this.purchasform = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      // email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      country: ['', Validators.required],
      phone: ['', Validators.required],
      // cardName: ['', Validators.required],
      cardofType: ['', Validators.required],
      CardNumber: ['', [Validators.required, CreditCardValidators.validateCCNumber]],
      expDate: ['', [Validators.required, CreditCardValidators.validateExpDate]],
      securityCode: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]],
      savecard: [''],

    });
    // console.log(this.countryListAllIsoData);
    this.currentUser = localStorage.getItem('user');
    this.productdetail = JSON.parse(localStorage.getItem('products'));
    // console.log(this.productdetail.id);
    this.checkCardNumber('');
    document.getElementById('firstName').focus();
  }
  get f() {
    return this.purchasform.controls;
  }
  onSubmit() {
    // debugger;
    this.submitted = true;
    // stop here if form is invalid
    if (this.purchasform.invalid) {
      // console.log('m invalid');
      return;
    }

    this.myArray = this.f.expDate.value.split(' / ');
    this.str = this.f.CardNumber.value;
    const cardnumber = this.str.replace(/\s+/g, '');

    const data = {
      first_name: this.f.firstName.value,
      last_name: this.f.lastName.value,
      // email: this.f.email.value,
      address: this.f.address.value,
      city: this.f.city.value,
      state: this.f.state.value,
      zipcode: this.f.zip.value,
      country: this.countryValue,
      phoneno: this.f.phone.value,
      paymentinstrumentid: '',
      card_number: cardnumber,
      cardexpirationMonth: this.myArray[0],
      cardexpirationYear: this.myArray[1],
      cvv: this.f.securityCode.value,
      cardtype: this.cardsTypevalue,
      toolid: this.productdetail.id,
      savecard: this.saveUsername,

    };
    // console.log(data);return false;
    this.cgxService.payment(data).subscribe((paymentstatus: any) => {
      if (paymentstatus.data?.responsestatus == 201 && paymentstatus.data.status == 'AUTHORIZED') {
        this.paymentFlag = true;
        localStorage.removeItem('products');
        this.router.navigate(['/paymentsuccessful']);
        // this.f.resetForm();
      }
      else {
        this.messageService.add({ detail: 'payment failed' });
      }
      // tslint:disable-next-line:no-shadowed-variable
    }, error => this.messageService.add({ detail: error.error.data.msg }));
  }

  changeWebsite(e) {
    this.cardsTypevalue = e.target.value;
  }
  changeCountry(e) {
    this.countryValue = e.target.value;
    // console.log(this.countryValue);
    this.cgxService.getStates(this.countryValue).subscribe(res => {
      this.stateList = res.result;
      // console.log(this.stateList);

    });
  }

  getCountry() {
    this.cgxService.getCounrty().subscribe(res => {
      this.countryListAllIsoData = res.result;
      // console.log(this.countryListAllIsoData);

    });

  }
  /*getState(countryName){
  console.log(countryName )
  this.cgxService.getStates(countryName).subscribe(res=> {
        this.stateList= res.result;
        console.log(this.stateList);

        });

  }*/
  getCardType() {
    return [
      { id: '001', name: 'Visa' },
      { id: '002', name: 'Mastercard' },
      { id: '003', name: 'American Express' },
      { id: '004', name: 'Discover' },
      { id: '005', name: 'Diners Club' },
    ];
  }
  signout() {
    this.authService.signout();
    this.router.navigate(['/signin']);
  }
  remove() {

    this.confirmationService.confirm({
      message: 'Are you sure that you want to remove this product?',
      accept: () => {
        localStorage.removeItem('products');
        // this.messageService.add({key:'removeKey',severity:'success',
        // summary:'Service Message', detail:'Tool Is deleted from purchase summary'});
        setTimeout(() => {
          this.router.navigate(['/authorizenewcrunch']);
        }, 500);
      },
      /*reject: () => {
         this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
     }*/
    });


  }
  public onSaveUsernameChanged(value) {

    if (value == true) {
      this.saveUsername = 1;
    }
    else {
      this.saveUsername = 0;
    }
    // console.log(this.saveUsername);
  }

  checkCardNumber(value: string) {
    if (value == '') {
      this.cardNumberFlag = false;
    } else {
      this.cardNumberFlag = true;
    }
  }

  // console.log()
}
