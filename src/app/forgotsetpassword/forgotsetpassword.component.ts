import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-forgotsetpassword',
  templateUrl: './forgotsetpassword.component.html',
  styleUrls: ['./forgotsetpassword.component.css']
})
export class ForgotsetpasswordComponent implements OnInit {

  constructor(private ps: ProductsService) { }

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {
  }
  onSubmit() {
    this.ps.forgotPassword(this.f.email.value).subscribe(res => {
      console.log(res);
      const a: any = res;
      // this.router.navigate(['/signin']);
    },

    );
  }
}
