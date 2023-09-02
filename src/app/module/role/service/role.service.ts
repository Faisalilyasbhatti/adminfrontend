import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { HttpService } from '../../../util/http/securehttp.service';
import { SystemConstants } from '../../system/system.constants';
import { Observable } from 'rxjs';
import { ShellComponent } from '../../../shell/shell.component';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../../../environments/environment';
import { Role } from '../model/role';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class RoleService {
  constructor(private http:HttpService) {}

  private baseUrl = environment.API_URL;
  private headers = SystemConstants.header;
  private secretKey: string = environment.SECRET_KEY;
  //get system nscs
  getNscs() :Observable<any> {
    let headers = new Headers();
    ShellComponent.showLoader();
    headers.append("Content-Type","application/json");
    let body = JSON.stringify({"userEmail":localStorage.getItem("userEmailAdmin")});
    body = SystemConstants.b64EncodeUnicode(body);
    body = JSON.stringify({ "input": body.toString()});
    return this.http.post(this.baseUrl+"nsc/service/byUser", body, {headers})
          .pipe(map((res) => {
            res = JSON.parse(SystemConstants.b64DecodeUnicode(res.json().output).toString());
            ShellComponent.hideLoader();
            return res;
          })).pipe(catchError((error:any) => {
            console.log(error);
            ShellComponent.hideLoader();
            return error;
    }));
  }

  //get permissions allowed
  getPermissions() :Observable<any> {
    ShellComponent.showLoader();
    let headers = new Headers();
    headers.append("Content-Type","application/json");
    // let body = JSON.stringify({"userEmail":localStorage.getItem("userEmailAdmin")});
    // body = SystemConstants.b64EncodeUnicode(body);
    // body = JSON.stringify({ "input": body.toString()});
    return this.http.get(this.baseUrl+"permission/list",{headers})
          .pipe(map((res) => {
            // res = JSON.parse(SystemConstants.b64DecodeUnicode(res.json().output).toString());
            ShellComponent.hideLoader();
            return res.json();
          })).pipe(catchError((error:any) => {
            console.log(error);
            ShellComponent.hideLoader();
            return error;
    }));
  }

  getRoleTypes() :Observable<any> {
    ShellComponent.showLoader();
    let headers = new Headers();
    headers.append("Content-Type","application/json");
    return this.http.get(this.baseUrl+"roleType/list",{headers})
          .pipe(map((res) => {
            ShellComponent.hideLoader();
            return res.json();
          })).pipe(catchError((error:any) => {
            console.log(error);
            ShellComponent.hideLoader();
            return error;
    }));
  }

  //get roles
  getRoles(): Observable<any> {
    ShellComponent.showLoader();
    let headers = new Headers();
    headers.append("Content-Type","application/json");
    // let body = JSON.stringify({"userEmail":userEmail});
    // body = SystemConstants.b64EncodeUnicode(body);
    // body = JSON.stringify({"input": CryptoJS.AES.encrypt(body, this.secretKey).toString()});
    return this.http.get(this.baseUrl+"role/list",{headers})
          .pipe(map((res) => {
            // res = JSON.parse(res.json());
            ShellComponent.hideLoader();
            return res.json();
          })).pipe(catchError((error:any) => {
            console.log(error);
            ShellComponent.hideLoader();
            return error;
    }));
  }


   //get roles
   deleteRole(id: number): Observable<any> {
    ShellComponent.showLoader();
    let headers = new Headers();
    headers.append("Content-Type","application/json");
    // let body = JSON.stringify({"userEmail":userEmail});
    // body = SystemConstants.b64EncodeUnicode(body);
    // body = JSON.stringify({"input": CryptoJS.AES.encrypt(body, this.secretKey).toString()});
    return this.http.delete(this.baseUrl+"role/"+id, {headers})
          .pipe(map((res) => {
            // res = JSON.parse(res.json());
            ShellComponent.hideLoader();
            return res.json();
          })).pipe(catchError((error:any) => {
            ShellComponent.hideLoader();
            return error;
    }));
  }


  editRole(id: number,role): Observable<any> {
    ShellComponent.showLoader();
    let headers = new Headers();
    headers.append("Content-Type","application/json");
    // let body = JSON.stringify({"userEmail":userEmail});
    // body = SystemConstants.b64EncodeUnicode(body);
    // body = JSON.stringify({"input": CryptoJS.AES.encrypt(body, this.secretKey).toString()});
    return this.http.put(this.baseUrl+"role/"+id,role,{headers})
          .pipe(map((res) => {
            // res = JSON.parse(res.json());
            ShellComponent.hideLoader();
            return res.json();
          })).pipe(catchError((error:any) => {
            ShellComponent.hideLoader();
            return error;
    }));
  }

  //save Role 
  saveRole(role: any): Observable<any> {
    ShellComponent.showLoader();
    let headers = new Headers();
    headers.append("Content-Type","application/json");
    let body = role;
    // body = JSON.parse(body);
    // body = JSON.stringify(body);
    return this.http.post(this.baseUrl+"role/", body, {headers})
          .pipe(map((res:any) => {
            ShellComponent.hideLoader();
            return JSON.parse(res._body);
          })).pipe(catchError((error:any) => {
            console.log(error);
            ShellComponent.hideLoader();
            return error;
    }));
  }

}
