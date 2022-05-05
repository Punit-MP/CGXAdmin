import { AddCardComponent } from './add-card/add-card.component';
import { TimeoutComponent } from './timeout/timeout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './admin/signin/signin.component';
import { CrunchboxdetailsComponent } from './crunchboxdetails/crunchboxdetails.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ApproveComponent } from './approve/approve.component';
import { DisapproveComponent } from './disapprove/disapprove.component';
import { PurchaseSummaryComponent } from './purchase-summary/purchase-summary.component';
import { PaymentsuccessfulComponent } from './paymentsuccessful/paymentsuccessful.component';
import { ProfileInformationComponent } from './profile-information/profile-information.component';
import { AuthorizenewcrunchComponent } from './authorizenewcrunch/authorizenewcrunch.component';
import { NotificationViewallpageComponent } from './notification-viewallpage/notification-viewallpage.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { CrunchboxtoolsComponent } from './admin/crunchboxtools/crunchboxtools.component';
// import { CrunchboxtoolsComponent } from './admin/crunchboxtools/crunchboxtools.component';
import { AddnewtoolComponent } from './admin/addnewtool/addnewtool.component';
import { DetailsRequestComponent } from './admin/details-request/details-request.component';
import { EditToolinformationComponent } from './admin/edit-toolinformation/edit-toolinformation.component';
import { TooldetailsComponent } from './admin/tooldetails/tooldetails.component';
import { UsermanagementAllregistrationrequestComponent } from './admin/usermanagement-allregistrationrequest/usermanagement-allregistrationrequest.component';
import { ChangepasswordComponent } from './admin/changepassword/changepassword.component';
import { AuthGuard } from './services/auth.guards';
import { UserAuthGuard } from './services/user.auth.guards';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { ResetSuccessfulComponent } from './reset-successful/reset-successful.component';
const routes: Routes = [
   {path: 'signup', component: SignupComponent },

  //  {path:'signin', component: SigninComponent },
   {path: 'timeout', component: TimeoutComponent },
  //  {path: 'forgot-password', component: ForgotPasswordComponent},
  //  {path: 'reset_password', component: ResetpasswordComponent},
  //  {path: 'reset_successful', component: ResetSuccessfulComponent},
  //  {path: 'notifications', component: NotificationViewallpageComponent, canActivate: [UserAuthGuard] },
  //  {path: 'authorizenewcrunch/:authtoken', component: AuthorizenewcrunchComponent},
  //  {path: 'authorizenewcrunch', component: AuthorizenewcrunchComponent, canActivate: [UserAuthGuard] },
  //  {path: 'crunchboxdetails', component: CrunchboxdetailsComponent },
  //  {path: 'crunchboxdetails/:id', component: CrunchboxdetailsComponent },
  //  {path: 'crunchboxdetails/:id/:token', component: CrunchboxdetailsComponent },
  //  {path: 'approve', component: ApproveComponent, canActivate: [UserAuthGuard] },
  //  {path: 'disapprove', component: DisapproveComponent, canActivate: [UserAuthGuard] },
  //  {path: 'purchase-summary', component: PurchaseSummaryComponent, canActivate: [UserAuthGuard] },
  //  {path: 'paymentsuccessful', component: PaymentsuccessfulComponent, canActivate: [UserAuthGuard] },
  //  {path: 'profileinformation', component: ProfileInformationComponent, canActivate: [UserAuthGuard] },
  //  {path: 'add-card', component: AddCardComponent, canActivate: [UserAuthGuard]},
  //  {path: 'marketplace', component: MarketplaceComponent, canActivate: [UserAuthGuard] },
  //  {path: 'changepassword', component: ChangePasswordComponent},
   {path: 'admin', component: SigninComponent},
   {path: 'admin/signin', component: SigninComponent},
   {path: 'admin/usermanagement', component: UserManagementComponent, canActivate: [AuthGuard]},
   {path: 'admin/user-list', component: UsermanagementAllregistrationrequestComponent, canActivate: [AuthGuard]},
   {path: 'admin/crunchboxtools', component: CrunchboxtoolsComponent, canActivate: [AuthGuard]},
   {path: 'admin/user-details/:id', component: DetailsRequestComponent, canActivate: [AuthGuard]},
   {path: 'admin/tool-details/:id', component: TooldetailsComponent, canActivate: [AuthGuard]},
   {path: 'admin/add-tool', component: AddnewtoolComponent, canActivate: [AuthGuard]},
   {path: 'admin/edit-tool/:id', component: EditToolinformationComponent, canActivate: [AuthGuard]},
   {path: 'admin/changepassword', component: ChangepasswordComponent, canActivate: [AuthGuard]},
   {path: '**', component: SigninComponent},
   // {path:'purchasecrunchtools', component:PurchasecrunchboxtoolsComponent},
   // {path: '**', component: SigninComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, UserAuthGuard]
})
export class AppRoutingModule { }


