import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { HttpService } from '../../../util/http/securehttp.service';
import { SystemConstants } from '../../system/system.constants';
import * as CryptoJS from 'crypto-js';
import { ShellComponent } from '../../../shell/shell.component';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { map, catchError } from 'rxjs/operators';


@Injectable()
export class DashboardService {
  constructor(private http:HttpService) {}

  private baseUrl = environment.API_URL;
  private headers = SystemConstants.header;
  private secretKey: string = environment.SECRET_KEY;

  //get Dashboard
  getDashboard(nscs: any[], sourceSystems: any[], fromDate: string, toDate: string): Observable<any> {
    ShellComponent.showLoader();
    let headers = new Headers();
    headers.append("Content-Type","application/json");
    let body = JSON.stringify({
                      "userEmail": sessionStorage.getItem("userEmailAdmin"),
                      "nscs": nscs.toString(),
                      "sourceSystems": sourceSystems.toString(),
                      "fromDate":fromDate,
                      "toDate":toDate});
    body = SystemConstants.b64EncodeUnicode(body);
    body = JSON.stringify({ "input": body.toString()});
    return this.http.post(this.baseUrl+"dashboard-fetchAll", body, {headers})
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

  //get Total customer count
  getCustomerCount(nscs: any[], sourceSystems: any[], fromDate: string, toDate: string): Observable<any> {
    // ShellComponent.showLoader();
    let headers = new Headers();
    headers.append("Content-Type","application/json");
    let body = JSON.stringify({
                      "userEmail": sessionStorage.getItem("userEmailAdmin"),
                      "nscs": nscs.toString(),
                      "sourceSystems": sourceSystems.toString(),
                      "fromDate":fromDate,
                      "toDate":toDate});
    body = SystemConstants.b64EncodeUnicode(body);
    body = JSON.stringify({ "input": body.toString()});
    return this.http.post(this.baseUrl+"dashboard-customer-count", body, {headers})
          .pipe(map((res) => {
            res = JSON.parse(SystemConstants.b64DecodeUnicode(res.json().output).toString());
            // ShellComponent.hideLoader();
            return res;
          })).pipe(catchError((error:any) => {
            console.log(error);
            // ShellComponent.hideLoader();
            return error;
    }));
  }

  //get Customers source-system wise
  getCustomersBySourceSystem(nscs: any[], sourceSystems: any[], fromDate: string, toDate: string): Observable<any> {
    // ShellComponent.showLoader();
    let headers = new Headers();
    headers.append("Content-Type","application/json");
    let body = JSON.stringify({
                      "userEmail": sessionStorage.getItem("userEmailAdmin"),
                      "nscs": nscs.toString(),
                      "sourceSystems": sourceSystems.toString(),
                      "fromDate":fromDate,
                      "toDate":toDate});
    body = SystemConstants.b64EncodeUnicode(body);
    body = JSON.stringify({ "input": body.toString()});
    return this.http.post(this.baseUrl+"dashboard-customer-fetchAll", body, {headers})
          .pipe(map((res) => {
            res = JSON.parse(SystemConstants.b64DecodeUnicode(res.json().output).toString());
            // ShellComponent.hideLoader();
            return res;
          })).pipe(catchError((error:any) => {
            console.log(error);
            // ShellComponent.hideLoader();
            return error;
    }));
  }

  //get Lumix Exp Customers count
  getLumixExpCustomerCount(nscs: any[], sourceSystems: any[], fromDate: string, toDate: string): Observable<any> {
    // ShellComponent.showLoader();
    let headers = new Headers();
    headers.append("Content-Type","application/json");
    let body = JSON.stringify({
                      "userEmail": sessionStorage.getItem("userEmailAdmin"),
                      "nscs": nscs.toString(),
                      "sourceSystems": sourceSystems.toString(),
                      "fromDate":fromDate,
                      "toDate":toDate});
    body = SystemConstants.b64EncodeUnicode(body);
    body = JSON.stringify({ "input": body.toString()});
    return this.http.post(this.baseUrl+"dashboard-lumixExp-count", body, {headers})
          .pipe(map((res) => {
            res = JSON.parse(SystemConstants.b64DecodeUnicode(res.json().output).toString());
            // ShellComponent.hideLoader();
            return res;
          })).pipe(catchError((error:any) => {
            console.log(error);
            // ShellComponent.hideLoader();
            return error;
    }));
  }

  //get customer membership count
  getCustomersMembershipCount(nscs: any[], sourceSystems: any[], fromDate: string, toDate: string): Observable<any> {
    // ShellComponent.showLoader();
    let headers = new Headers();
    headers.append("Content-Type","application/json");
    let body = JSON.stringify({
                      "userEmail": sessionStorage.getItem("userEmailAdmin"),
                      "nscs": nscs.toString(),
                      "sourceSystems": sourceSystems.toString(),
                      "fromDate":fromDate,
                      "toDate":toDate});
    body = SystemConstants.b64EncodeUnicode(body);
    body = JSON.stringify({ "input": body.toString()});
    return this.http.post(this.baseUrl+"dashboard-membership-count", body, {headers})
          .pipe(map((res) => {
            res = JSON.parse(SystemConstants.b64DecodeUnicode(res.json().output).toString());
            // ShellComponent.hideLoader();
            return res;
          })).pipe(catchError((error:any) => {
            console.log(error);
            // ShellComponent.hideLoader();
            return error;
    }));
  }

  //get Newsletter subscription count
  getNewsletterSubscriptionCount(nscs: any[], sourceSystems: any[], fromDate: string, toDate: string): Observable<any> {
    // ShellComponent.showLoader();
    let headers = new Headers();
    headers.append("Content-Type","application/json");
    let body = JSON.stringify({
                      "userEmail": sessionStorage.getItem("userEmailAdmin"),
                      "nscs": nscs.toString(),
                      "sourceSystems": sourceSystems.toString(),
                      "fromDate":fromDate,
                      "toDate":toDate});
    body = SystemConstants.b64EncodeUnicode(body);
    body = JSON.stringify({ "input": body.toString()});
    return this.http.post(this.baseUrl+"dashboard-newsletter-count", body, {headers})
          .pipe(map((res) => {
            res = JSON.parse(SystemConstants.b64DecodeUnicode(res.json().output).toString());
            // ShellComponent.hideLoader();
            return res;
          })).pipe(catchError((error:any) => {
            console.log(error);
            // ShellComponent.hideLoader();
            return error;
    }));
  }

  //get average product registeration
  getAverageProductRegistration(nscs: any[], sourceSystems: any[], fromDate: string, toDate: string): Observable<any> {
    // ShellComponent.showLoader();
    let headers = new Headers();
    headers.append("Content-Type","application/json");
    let body = JSON.stringify({
                      "userEmail": sessionStorage.getItem("userEmailAdmin"),
                      "nscs": nscs.toString(),
                      "sourceSystems": sourceSystems.toString(),
                      "fromDate":fromDate,
                      "toDate":toDate});
    body = SystemConstants.b64EncodeUnicode(body);
    body = JSON.stringify({ "input": body.toString()});
    return this.http.post(this.baseUrl+"dashboard-product-average", body, {headers})
          .pipe(map((res) => {
            res = JSON.parse(SystemConstants.b64DecodeUnicode(res.json().output).toString());
            // ShellComponent.hideLoader();
            return res;
          })).pipe(catchError((error:any) => {
            console.log(error);
            // ShellComponent.hideLoader();
            return error;
    }));
  }

  //get total registered product count
  getTotalRegisteredProductCount(nscs: any[], sourceSystems: any[], fromDate: string, toDate: string): Observable<any> {
    // ShellComponent.showLoader();
    let headers = new Headers();
    headers.append("Content-Type","application/json");
    let body = JSON.stringify({
                      "userEmail": sessionStorage.getItem("userEmailAdmin"),
                      "nscs": nscs.toString(),
                      "sourceSystems": sourceSystems.toString(),
                      "fromDate":fromDate,
                      "toDate":toDate});
    body = SystemConstants.b64EncodeUnicode(body);
    body = JSON.stringify({ "input": body.toString()});
    return this.http.post(this.baseUrl+"dashboard-product-count", body, {headers})
          .pipe(map((res) => {
            res = JSON.parse(SystemConstants.b64DecodeUnicode(res.json().output).toString());
            // ShellComponent.hideLoader();
            return res;
          })).pipe(catchError((error:any) => {
            console.log(error);
            // ShellComponent.hideLoader();
            return error;
    }));
  }

  //get extend warranty purchase count
  getExtendWarrantyPurchaseCount(nscs: any[], sourceSystems: any[], fromDate: string, toDate: string): Observable<any> {
    // ShellComponent.showLoader();
    let headers = new Headers();
    headers.append("Content-Type","application/json");
    let body = JSON.stringify({
                      "userEmail": sessionStorage.getItem("userEmailAdmin"),
                      "nscs": nscs.toString(),
                      "sourceSystems": sourceSystems.toString(),
                      "fromDate":fromDate,
                      "toDate":toDate});
    body = SystemConstants.b64EncodeUnicode(body);
    body = JSON.stringify({ "input": body.toString()});
    return this.http.post(this.baseUrl+"dashboard-purchase-warranties-count", body, {headers})
          .pipe(map((res) => {
            res = JSON.parse(SystemConstants.b64DecodeUnicode(res.json().output).toString());
            // ShellComponent.hideLoader();
            return res;
          })).pipe(catchError((error:any) => {
            console.log(error);
            // ShellComponent.hideLoader();
            return error;
    }));
  }

  getNscs() :Observable<any> {
    ShellComponent.showLoader();
    let headers = new Headers();
    headers.append("Content-Type","application/json");
    let body = JSON.stringify({"userEmail":sessionStorage.getItem("userEmailAdmin")});
    body = SystemConstants.b64EncodeUnicode(body);
    body = JSON.stringify({ "input": body.toString()});
    return this.http.post(this.baseUrl+"nsc-service-byUser", body, {headers})
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

  getSourceSystems() :Observable<any> {
    ShellComponent.showLoader();
    let headers = new Headers();
    headers.append("Content-Type","application/json");
    let body = JSON.stringify({"userEmail":sessionStorage.getItem("userEmailAdmin")});
    body = SystemConstants.b64EncodeUnicode(body);
    body = JSON.stringify({ "input": body.toString()});
    return this.http.post(this.baseUrl+"sourceSystem-service-list", body, {headers})
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
}
