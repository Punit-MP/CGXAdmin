import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};
export interface ServerResponse {
  success: boolean;
   msg: string;
   user_status: any;
   user_id: any;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  baseurl = 'https://cgxapi.mobileprogramming.net/';

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post(this.baseurl + 'user/login', {email, password});
}

register(signup): Observable<any> {
  const headers = { 'content-type': 'application/json'};
  // const body=JSON.stringify(signup);
  const data = {
    first_name: JSON.stringify(signup.first_name),
    last_name: JSON.stringify(signup.last_name),
    email: JSON.stringify(signup.email),
    institution:  JSON.stringify(signup.institution),
    device_name: JSON.stringify(signup.device_name),
    password: JSON.stringify(signup.password)
  };
  console.log(data);
  return this.http.post(this.baseurl + 'user/signup', data, {headers});
}

forgotPassword(email: string) {
  return this.http.post(this.baseurl + 'user/forget_password', {email});
}

// tslint:disable-next-line:variable-name
resetPassword(password: string, confirm_password: string) {
  return this.http.post(this.baseurl + 'user/reset_password', {password, confirm_password});
}

// crunchboxDetails(tool_name:string, description_name:string, description_details:string, price:number) {
//   return this.http.post(this.baseurl + 'listingTool/addTools', {tool_name, description_name, description_details, price})
// }

crunchbox() {
  return this.http.get(this.baseurl + 'listingTool/getTools');
}

crenchboxId(id: number){
  return this.http.get(this.baseurl + 'listingTool/getToolsByID/' + id);
}


// tslint:disable-next-line:ban-types
Signup(signUp: Object): Observable<any> {
  return this.http.post(
    `${this.baseurl}/user/signup`,
    signUp
  );
}

}
