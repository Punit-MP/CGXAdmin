import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CgxService } from '../services/cgx.service';
import { MessageService } from 'primeng/api';
import { Responsemsg, ForgotPassword } from '../models/cgxModel';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  resetForm: FormGroup;
  IsResetFormValid = true;
  submitted = false;
  // tslint:disable-next-line:variable-name
  blocked_reset_Wait = false;
  errorMessage: string;
  forgotPassword: ForgotPassword = new ForgotPassword();
  // tslint:disable-next-line:variable-name
  blocked_signup_Wait = false;
  responsemsg: Responsemsg;

  constructor(private router: Router, private cgxService: CgxService,
              private messageService: MessageService) { }



  ngOnInit(): void {
  }


  save() {
    this.blocked_signup_Wait = true;
    // console.log("Data:" + JSON.stringify(this.forgotPassword));
    const data = {
      email: this.forgotPassword.email,
    };
    this.cgxService.forgotPassword(this.forgotPassword)
      .subscribe(
        (response) => {
          // tslint:disable-next-line:no-shadowed-variable
          const data: any = response;
          if (data.status == true) {
            // alert(data.msg);
            this.messageService.add({ key: 'forgotPassKey', detail: data.msg });
            setTimeout(() => {
              this.router.navigate(['/reset_password']);
            }, 1000);
            this.blocked_reset_Wait = false;
          }
          else {
            this.messageService.add({ key: 'forgotPassKey', detail: data.msg });
            // this.router.navigate(['/signin']);
            this.blocked_reset_Wait = false;
          }
        },
        (error) => {
          this.blocked_reset_Wait = false;
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
          this.messageService.add({ key: 'forgotPassKey', detail: errorMessage });
        });
    this.forgotPassword = new ForgotPassword();
  }

  onSubmit(frm: NgForm) {
    this.submitted = true;
    this.save();
    frm.resetForm();
  }


}

