import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { HttpService } from '../../../util/http/securehttp.service';
import { SystemConstants } from '../../system/system.constants';
import { Observable } from 'rxjs';
import { ShellComponent } from '../../../shell/shell.component';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../../../environments/environment';
import { User } from '../model/user';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class UserService {
  constructor(private http:HttpService) {}

  private baseUrl = environment.API_URL;
  private headers = SystemConstants.header;
  private secretKey: string = environment.SECRET_KEY;

  //get roles
  getRoles(): Observable<any> {
    ShellComponent.showLoader();
    let headers = new Headers();
    headers.append("Content-Type","application/json");
    // let body = JSON.stringify({"userEmail":localStorage.getItem("userEmailAdmin")});
    // body = SystemConstants.b64EncodeUnicode(body);
    // body = JSON.stringify({ "input": body.toString()});
    return this.http.get(this.baseUrl+"role/list",{headers})
          .pipe(map((res) => {
            ShellComponent.hideLoader();
            return res.json();
          })).pipe(catchError((error:any) => {
            console.log(error);
            ShellComponent.hideLoader();
            return error;
    }));
  }

  //getUsers
  getUsers(): Observable<any> {
    ShellComponent.showLoader();
    let headers = new Headers();
    headers.append("Content-Type","application/json");
    // let body = {"userEmail":sessionStorage.getItem("userEmailAdmin")};
    return this.http.get(this.baseUrl+"user/list", {headers})
          .pipe(map((res: any) => {
            ShellComponent.hideLoader();
            // return JSON.parse(res._body);
            return res.json();
          })).pipe(catchError((error:any) => {
            console.log(error);
            ShellComponent.hideLoader();
            return error;
    }));
  }

  //save Users
  saveUser(user: any): Observable<any> {
    ShellComponent.showLoader();
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let body: any = JSON.stringify({"userVo":user});
    return this.http.post(this.baseUrl+"user/", body, {headers})
          .pipe(map((res:any) => {
            ShellComponent.hideLoader();
            return JSON.parse(res._body);
          })).pipe(catchError((error:any) => {
            console.log(error);
            ShellComponent.hideLoader();
            return error;
    }))
  }

  //reset-password
  resetPassword(email: string, password: string): Observable<any> {
    ShellComponent.showLoader();
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let body: any = null; //SystemConstants.b64EncodeUnicode(JSON.stringify({
                    //   "userEmail":sessionStorage.getItem("userEmailAdmin"),
                    //   "email":email,
                    //   "password":password
                    // }));
    //body = JSON.stringify({"input": body.toString()});
    body = {
      "userEmail":sessionStorage.getItem("userEmailAdmin"),
      "email":email,
      "password":password
    };
    return this.http.post(this.baseUrl+"user/service/resetPassword", body, {headers})
          .pipe(map((res:any) => {
            // res = JSON.parse(SystemConstants.b64DecodeUnicode(res.json().output).toString());
            ShellComponent.hideLoader();
            return JSON.parse(res._body);
          })).pipe(catchError((error:any) => {
            console.log(error);
            ShellComponent.hideLoader();
            return error;
    }));
  }

  deleteUser(childEmail: string) : Observable<any>{
    ShellComponent.showLoader();
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // let body: any = SystemConstants.b64EncodeUnicode(JSON.stringify({
    //                   "userEmail":sessionStorage.getItem("userEmailAdmin"),
    //                   "childEmail":childEmail
    //                 }));
    // body = JSON.stringify({"input": body.toString()});
    let body: any = {
      "userEmail":sessionStorage.getItem("userEmailAdmin"),
      "childEmail":childEmail
    };
    return this.http.post(this.baseUrl+"user/service/delete", body, {headers})
          .pipe(map((res:any) => {
            // res = JSON.parse(SystemConstants.b64DecodeUnicode(res.json().output).toString());
            ShellComponent.hideLoader();
            return JSON.parse(res._body);
          })).pipe(catchError((error:any) => {
            console.log(error);
            ShellComponent.hideLoader();
            return error;
    }));
  }
}
