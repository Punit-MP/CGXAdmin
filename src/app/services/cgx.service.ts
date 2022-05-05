import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResetPassword } from '../models/cgxModel';
import { Location } from '@angular/common';
@Injectable({
  providedIn: 'root',
})

export class CgxService {
  // tslint:disable-next-line:variable-name
  constructor(private http: HttpClient, private _location: Location) { }
  // tslint:disable-next-line:ban-types
  Signup(signUp: Object): Observable<any> {
    return this.http.post(
      `${environment.cgxApiUrl}/user/signup`, signUp);
  }
  // tslint:disable-next-line:ban-types
  forgotPassword(forgotPassword: Object): Observable<any> {
    return this.http.post(`${environment.cgxApiUrl}/user/forget_password`, forgotPassword);
  }

  // tslint:disable-next-line:ban-types
  resetPassword(resetPassword: ResetPassword): Observable<Object> {
    return this.http.post(`${environment.cgxApiUrl}/user/reset_password`, resetPassword);
  }

  crunchbox() {
    return this.http.get(`${environment.cgxApiUrl}/listingTool/getPurchasedListingTools`);

  }

  authNewcrunchbox(): Observable<any> {

    return this.http.get<any>(`${environment.cgxApiUrl}/listingTool/getTools`);
  }


  crunchboxDetailId(id: number): Observable<any> {
    return this.http.get<any>(`${environment.cgxApiUrl}/listingTool/getToolsByID/` + id);
  }
  validateToken(authtoken): Observable<any> {
    // console.log(authtoken);
    //  const headers = { 'Authorization': token }
    //  let headers = new Headers();
    // this.createAuthorizationHeader(token);
    return this.http.post(`${environment.cgxApiUrl}/user/token-validate/`, { token: authtoken });
  }
  // tslint:disable-next-line:ban-types
  payment(data: object): Observable<Object> {
    return this.http.post(`${environment.cgxApiUrl}/user/payment`, data);
  }
  userDetails(): Observable<any> {
    return this.http.get<any>(`${environment.cgxApiUrl}/user/get-details`);

  }
  deleteCard(id: string): Observable<any> {
    // let body = {card_id: id}
    return this.http.delete<any>(`${environment.cgxApiUrl}/user/delete-card/` + id);

  }
  deleteUser(id: string): Observable<any> {
    // let body = {card_id: id}
    return this.http.delete<any>(`${environment.cgxApiUrl}/user/delete-user/` + id);
  }
  // tslint:disable-next-line:ban-types
  changePassword(data: object): Observable<Object> {
    return this.http.post(`${environment.cgxApiUrl}/user/change_password`, data);
  }
  // tslint:disable-next-line:ban-types
  changeAdminPassword(data: object): Observable<Object> {
    return this.http.post(`${environment.cgxApiUrl}/user/admin_change_password`, data);
  }
  // tslint:disable-next-line:ban-types
  updateProfile(data: object): Observable<Object> {
    return this.http.put<any>(`${environment.cgxApiUrl}/user/update_user`, data);
  }
  getCounrty(): Observable<any> {
    return this.http.get<any>(`${environment.cgxApiUrl}/user/getCountry`);
  }
  getStates(shortName: string): Observable<any> {
    // console.log('short'+shortName);
    return this.http.get<any>(`${environment.cgxApiUrl}/user/getState/` + shortName);
  }
  getUserNotification(): Observable<any> {
    // console.log('short'+shortName);
    return this.http.get<any>(`${environment.cgxApiUrl}/user/getUserNotification`);
  }
  // tslint:disable-next-line:ban-types
  addCard(data: object): Observable<Object> {
    return this.http.post(`${environment.cgxApiUrl}/user/add-card`, data);
  }
  // tslint:disable-next-line:ban-types
  updateUserNotification(data: object): Observable<Object> {
    return this.http.post(`${environment.cgxApiUrl}/user/updateUserNotification`, data);
  }
  deleteNotification(id: string): Observable<any> {
    // let body = {card_id: id}
    return this.http.delete<any>(`${environment.cgxApiUrl}/user/deleteNotification/` + id);

  }
  newNegistration(): Observable<any> {
    // console.log('short'+shortName);
    return this.http.get<any>(`${environment.cgxApiUrl}/user/new_registration`);
  }
  allRegistration(): Observable<any> {
    // console.log('short'+shortName);
    return this.http.get<any>(`${environment.cgxApiUrl}/user/all_registration`);
  }
  adminUserDetails(id: string): Observable<any> {
    // console.log('id');
    return this.http.get<any>(`${environment.cgxApiUrl}/user/details/` + id);
  }
  getTools(): Observable<any> {
    // console.log('id');
    return this.http.get<any>(`${environment.cgxApiUrl}/user/getTools`);
  }
  admintoolDetails(id: string): Observable<any> {
    // console.log('id');
    return this.http.get<any>(`${environment.cgxApiUrl}/user/getToolsByID/` + id);
  }
  adminApprove(userId, status): Observable<any> {
    const body = { id: userId, status };
    return this.http.put<any>(`${environment.cgxApiUrl}/user/get-approve-disapprove/` + userId + `/` + status, body);
  }
  adminDeleteTool(id: string): Observable<any> {
    // let body = {card_id: id}
    return this.http.delete<any>(`${environment.cgxApiUrl}/user/delete-tools/` + id);

  }
  adminAddTool(data: object): Observable<any> {
    // console.log(data);
    return this.http.post(`${environment.cgxApiUrl}/listingTool/addTools`, data);

  }
  // tslint:disable-next-line:ban-types
  adminUpdateTool(data: object): Observable<Object> {
    return this.http.put<any>(`${environment.cgxApiUrl}/listingTool/editTools`, data);
  }
  searchTool(tool: string): Observable<any> {
    // console.log(tool);
    return this.http.get<any>(`${environment.cgxApiUrl}/listingTool/searchTool/` + tool);
  }

  // ApproveDisApprove(id: number, status: number): Observable<Object> {
  //   let url = `${environment.cgxApiUrl}/get-approve-disapprove/${id}/${status}`;
  //   console.log("url: " + url);
  //   let body = {id: id, status: status}
  //   return this.http.put(`${environment.cgxApiUrl}/get-approve-disapprove/${id}/${status}`, body)
  //   }

  goBack() {
    // window.history.back();
    this._location.back();
  }

}



