import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth/auth.service';
import { OldPwdValidators } from 'src/app/profile-information/passwordvalidator';
import { CgxService } from 'src/app/services/cgx.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  public showPassword: boolean;
  changeForm: FormGroup;
  public showNewPassword: boolean;
  public showConfirmPassword: boolean;
  submitted = false;
  constructor(private messageService: MessageService, private cgxService: CgxService, formBuilder: FormBuilder,
              private authService: AuthService, private router: Router) {
    this.changeForm = formBuilder.group({
      currentpassword: ['', Validators.required],
      newpassword: ['', Validators.required],
      confirmpass: ['', Validators.required]
    }, {
      validator: OldPwdValidators.matchPwds
    });
  }
  get f() {
    return this.changeForm.controls;
  }
  ngOnInit(): void {
  }
  onSubmit() {
    // debugger;
    this.submitted = true;
    // stop here if form is invalid
    if (this.changeForm.invalid) {
      // console.log('m invalid');
      return;
    }
    const data = {
      old_password: this.f.currentpassword.value,
      new_password: this.f.newpassword.value,
      confirm_password: this.f.confirmpass.value,
    };
    this.cgxService.changeAdminPassword(data).subscribe((response: any) => {
      if (response.status == 200) {
        this.messageService.add({detail: response.msg });
        this.adminSignout();
        this.router.navigate(['/admin']);
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: response.msg });
        this.router.navigate(['/admin/changepassword']);
      }
    },
      (error: HttpErrorResponse) => {
        console.log('error: ', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Enter valid passwords' });
        this.router.navigate(['/admin/changepassword']);
      });
  }

  adminSignout() {
    this.authService.adminSignout();
  }
}
