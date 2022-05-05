import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { Responsemsg } from '../../models/cgxModel';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  loginFrm: FormGroup;
  submitted = false;
  // tslint:disable-next-line:variable-name
  blocked_Login_Wait = false;
  token: string;
  admin = 'Admin';
  responsemsg: Responsemsg;
  errorMessage;
  // tslint:disable-next-line:variable-name
  user_type: number;
  currentUser: any;
  usertype: string;
  data: any;
  public showPassword: boolean;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.token = this.activatedRoute.snapshot.params.token;
    this.loginFrm = this.formBuilder.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.currentUser) {
      const { email, password } = this.currentUser;
      this.loginFrm.controls.email.setValue(email);
      this.loginFrm.controls.password.setValue(password);
    }
  }


  get f() {
    return this.loginFrm.controls;
  }

  login() {
    this.submitted = true;
    if (this.loginFrm.invalid) {
      return;
    }
    this.blocked_Login_Wait = true;
    const { email, password } = this.loginFrm.value;
    this.authService.loginUser(
      {
        email: this.f.email.value,
        password: this.f.password.value
      })
      .subscribe((response) => {
        // this.responsemsg = response;
        this.data = response;
        this.blocked_Login_Wait = false;
        this.usertype = this.data.result.userType;
        // console.log(success);
        if (this.data.status == 200 && this.usertype === 'admin') {
          // this.messageService.add({ key: 'loginKey', severity: 'success', summary: 'Success', detail: 'Login Successfully' });
          this.router.navigate(['/admin/usermanagement']);
        } else if (this.data.status == 200) {
          // this.router.navigate(['/authorizenewcrunch']);
          this.messageService.add({ key: 'loginKey', severity: 'error', summary: 'Failure', detail: 'Only Admin allowed' });
        }
        else {
          this.messageService.add({ key: 'loginKey', severity: 'error', summary: 'Failure', detail: 'User is not Authanticated' });

        }
      });
  }
}
