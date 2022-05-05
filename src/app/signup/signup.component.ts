import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Responsemsg, SignUp } from '../models/cgxModel';
import { NgForm } from '@angular/forms';
import { CgxService } from '../services/cgx.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  errorMessage: string;
  submitted = true;
  signUp: SignUp = new SignUp();
  // tslint:disable-next-line:variable-name
  blocked_signup_Wait = false;
  responsemsg: Responsemsg;
  public showPassword: boolean;
  public showConfirmPassword: boolean;


  constructor(private router: Router, private cgxService: CgxService, private messageService: MessageService) { }

  ngOnInit(): void { }



  save() {
    this.blocked_signup_Wait = true;
    // console.log("Data:" + JSON.stringify(this.signUp));
    const data = {
      device_name: this.signUp.device_name,
      email: this.signUp.email,
      first_name: this.signUp.first_name,
      institution: this.signUp.institution,
      last_name: this.signUp.last_name,
      password: this.signUp.password
    };
    // console.log("Data:" + JSON.stringify(this.signUp));return false;
    this.cgxService.Signup(data)
      .subscribe(
        (response) => {
          this.responsemsg = response;
          // console.log(this.responsemsg);
          // tslint:disable-next-line:no-shadowed-variable
          const data: any = response;
          if (data.status == 200) {
            // this.messageService.add({ key: 'signupKey',  detail: data.msg });
            // this.router.navigate(['/signin']);
            this.blocked_signup_Wait = false;

          }
          else {
            this.messageService.add({ key: 'signupKey', detail: data.msg });
            // this.router.navigate(['/signup']);
            this.blocked_signup_Wait = false;
          }
        },
        (error) => {
          this.blocked_signup_Wait = false;
          // console.log("Error: " +JSON.stringify(error.error));
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.msg}`;
          } else {
            // server-side error
            // errorMessage = `Error Code: ${error.status}\nMessage: ${error.error}`;
            errorMessage = `${error.error.msg}`;
          }
          window.alert(errorMessage);
        });
    this.signUp = new SignUp();
  }

  onSubmit(frm: NgForm) {
    this.submitted = true;
    this.save();
    frm.resetForm();

  }

}

