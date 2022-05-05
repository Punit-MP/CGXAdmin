import { AbstractControl, ValidationErrors } from '@angular/forms';

export class OldPwdValidators {
  static shouldBe1234(control: AbstractControl): Promise<ValidationErrors | null> {
    return new Promise((resolve, reject) => {
        if (control.value !== '1234') {
          resolve({ shouldBe1234: true });
        }
        else {
          resolve(null);
        }
    });
  }

  static matchPwds(control: AbstractControl) {
    // console.log(control);
    const newPwd2 = control.get('newpassword');
    const confirmPwd2 = control.get('confirmpass');
   // console.log(newPwd2.value ) ;
    if (newPwd2.value !== confirmPwd2.value){
      return { pwdsDontMatch: true };
    }
    return null;
  }
}
