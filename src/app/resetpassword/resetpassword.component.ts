import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
// import 'rxjs/add/operator/filter'
import { ActivatedRoute, Router } from '@angular/router';
import { CgxService } from '../services/cgx.service';
import { MessageService } from 'primeng/api';
import { ResetPassword } from '../models/cgxModel';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})

export class ResetpasswordComponent implements OnInit {

  resetForm: FormGroup;
  IsResetFormValid = true;
  public showPassword: boolean;
  public showConfirmPassword: boolean;
  resetPass: ResetPassword = new ResetPassword();
  submitted = false;
  token: string;
  // tslint:disable-next-line:variable-name
  blocked_reset_Wait = false;
  // tslint:disable-next-line:variable-name
  confirm_password: string;
  password: string;
  errorMessage: string;


  constructor(private router: Router,
              private fb: FormBuilder, private activatedRoute: ActivatedRoute, private messageService: MessageService,
              private cgxService: CgxService) { }

  ngOnInit(): void {
    this.token = this.activatedRoute.snapshot.queryParams.token;
  }
  // onSubmit() {
  //   let data={
  //     password: this.registerForm.get('password').value,
  //     confirm_password: this.registerForm.get('confirm_password').value,
  //     token: this.registerForm.get('token').value,
  //   }
  //   debugger;
  //  this.cgxService.resetPassword(data).subscribe(res=> {
  //    console.log(res)
  //    let a:any = res
  //   // this.toastr.success(a.msg);
  //    this.router.navigate(['/signin']);
  //  })

  // }

  onSubmit(resetFrm: NgForm) {
    if (resetFrm.valid) {
      this.blocked_reset_Wait = true;
      this.cgxService.resetPassword(resetFrm.value)
        .pipe(first())
        .subscribe(
          (data: any) => {
            this.blocked_reset_Wait = false;
            if (data.status == 200) {
              this.messageService.add({ key: 'resetKey', detail: 'Password reset Successfully' });
              this.router.navigate(['/reset_successful']);
            }
            else{
              this.messageService.add({ key: 'resetKey',  summary: 'Failure',
               detail: data.msg });
              this.password = '';
              this.confirm_password = '';
            }
            // this.router.navigate(['/signin']);
          },
          error => {
            this.blocked_reset_Wait = false;
            let errorMessage = '';
            if (error.error instanceof ErrorEvent) {
              // client-side error
              errorMessage = `Error: ${error.error.msg}`;
            } else {
              // server-side error
              errorMessage = `Error Code: ${error.status}\nMessage: ${error.error}`;
            }
            this.password = '';
            this.confirm_password = '';
            this.messageService.add({ key: 'resetKey',  summary: 'Failure',
            detail: errorMessage });
          });
      // this.router.navigate(['/timeout']);
    }
  }

}

