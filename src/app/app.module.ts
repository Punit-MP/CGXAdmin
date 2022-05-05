import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule, HttpRequest, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CgxService} from './services/cgx.service';
import { RouterModule } from '@angular/router';
import { TokenInterceptor } from './auth/token.interceptor';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import {ProgressBarModule} from 'primeng/progressbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService} from 'primeng/api';
import { ToastModule} from 'primeng/toast';
import { Routes} from '@angular/router';
const routes: Routes = [];
import {DialogModule} from 'primeng/dialog';
import { SignupComponent } from './signup/signup.component';
import { MustMatchDirective } from './directives/must-match.directive';
import { SigninComponent } from './admin/signin/signin.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ApproveComponent } from './approve/approve.component';
import { DisapproveComponent } from './disapprove/disapprove.component';
import { PurchaseSummaryComponent } from './purchase-summary/purchase-summary.component';
import { ProfileInformationComponent } from './profile-information/profile-information.component';
import { PaymentsuccessfulComponent } from './paymentsuccessful/paymentsuccessful.component';
import { AuthorizenewcrunchComponent } from './authorizenewcrunch/authorizenewcrunch.component';
import { CreditCardDirectivesModule } from 'angular-cc-library';
import {CrunchboxdetailsComponent } from './crunchboxdetails/crunchboxdetails.component';
import { NotificationViewallpageComponent } from './notification-viewallpage/notification-viewallpage.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { CrunchboxtoolsComponent } from './admin/crunchboxtools/crunchboxtools.component';
import { AddnewtoolComponent } from './admin/addnewtool/addnewtool.component';
import { DetailsRequestComponent } from './admin/details-request/details-request.component';
import { EditToolinformationComponent } from './admin/edit-toolinformation/edit-toolinformation.component';
import { TooldetailsComponent } from './admin/tooldetails/tooldetails.component';
import { UsermanagementAllregistrationrequestComponent } from './admin/usermanagement-allregistrationrequest/usermanagement-allregistrationrequest.component';
// import { JwPaginationComponent } from 'jw-angular-pagination';
import {NgxPaginationModule} from 'ngx-pagination';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangepasswordComponent } from './admin/changepassword/changepassword.component';
import { BlockUIModule } from 'ng-block-ui';
import { BlockUIHttpModule } from 'ng-block-ui/http';
import { BnNgIdleService } from 'bn-ng-idle';
import { TimeoutComponent } from './timeout/timeout.component';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { AddCardComponent } from './add-card/add-card.component';
import { ResetSuccessfulComponent } from './reset-successful/reset-successful.component';
import { CKEditorModule } from 'ckeditor4-angular';
const requestFilters = [
  { method: 'GET', url: new RegExp(/listingTool\/getTools/) },
];
export function filter(req: HttpRequest<any>): boolean {
  return requestFilters.some(({ method, url }: { method: string, url: RegExp }) => {
      return (req.method === method && url.test(req.url)) || req.headers.has('x-block-loader');
  });
}
@NgModule({
  declarations: [
    AppComponent, UserManagementComponent, AddnewtoolComponent, DetailsRequestComponent, EditToolinformationComponent, TooldetailsComponent,
     UsermanagementAllregistrationrequestComponent, SignupComponent, CrunchboxdetailsComponent, MustMatchDirective, SigninComponent,
      ForgotPasswordComponent, ResetpasswordComponent, ApproveComponent, DisapproveComponent, PurchaseSummaryComponent,
     ProfileInformationComponent, PaymentsuccessfulComponent, AuthorizenewcrunchComponent, NotificationViewallpageComponent,
     UserManagementComponent, CrunchboxtoolsComponent, AdminHeaderComponent, ChangePasswordComponent, ChangepasswordComponent,
      TimeoutComponent, MarketplaceComponent, AddCardComponent, ResetSuccessfulComponent,
   ],

imports: [BrowserAnimationsModule, NgxPaginationModule, CreditCardDirectivesModule, CKEditorModule, BrowserModule, AppRoutingModule,
  SharedModule, HttpClientModule, FormsModule, ReactiveFormsModule, RouterModule, ProgressBarModule, ConfirmDialogModule, ToastModule,
   DialogModule, BlockUIHttpModule.forRoot({blockAllRequestsInProgress: true, requestFilters: [filter]}), BlockUIModule.forRoot()],
providers: [CgxService, AuthGuard, BnNgIdleService, ConfirmationService, MessageService, AuthService,
   {provide: LocationStrategy, useClass: HashLocationStrategy}, { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
bootstrap: [AppComponent]
})
export class AppModule { }
