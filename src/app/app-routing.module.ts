import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApproveComponent } from './approve/approve.component';
import { DisapproveComponent } from './disapprove/disapprove.component';
import { ForgotsetpasswordComponent } from './forgotsetpassword/forgotsetpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { CrunchboxComponent } from './crunchbox/crunchbox.component';
import { CrunchboxdetailsComponent } from './crunchboxdetails/crunchboxdetails.component';

const routes: Routes = [
  {path: '', component: SigninComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'resetpassword', component: ResetpasswordComponent},
  {path: 'forgotsetpassword', component: ForgotsetpasswordComponent},
  {path: 'approve', component: ApproveComponent},
  {path: 'disapprove', component: DisapproveComponent},
  {path: 'crunchbox', component: CrunchboxComponent},

  {path: 'crunchboxdetails/:id', component: CrunchboxdetailsComponent},
  {path: '**', component: SigninComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
