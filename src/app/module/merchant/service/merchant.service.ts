import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Headers, ResponseContentType } from '@angular/http';
import { catchError, map } from 'rxjs/operators';
import { ShellComponent } from '../../../../app/shell/shell.component';
import { HttpService } from '../../../../app/util/http/securehttp.service';
import { environment } from '../../../../../src/environments/environment';
import { SystemConstants } from '../../system/system.constants';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {

  constructor(private http:HttpService) {}

  private baseUrl = environment.API_URL;
  private headers = SystemConstants.header;
  private secretKey: string = environment.SECRET_KEY;


    getMerchants(status:number): Observable<any> {
      ShellComponent.showLoader();
      let headers = new Headers();
      headers.append("Content-Type","application/json");
      return this.http.get(this.baseUrl+"customer/list?status="+status, {headers})
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

    getSelectedMerchant(email): Observable<any> {
      ShellComponent.showLoader();
      let headers = new Headers();
      headers.append("Content-Type","application/json");
      return this.http.get(this.baseUrl+`customer/search?email=${email}`, {headers})
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

  approveMerchants(request: any): Observable<any> {
    ShellComponent.showLoader();
    let headers = new Headers();
    headers.append("Content-Type","application/json");
    let body: any = JSON.stringify(request);
    return this.http.post(this.baseUrl+"customer/update/status",body,{headers})
          .pipe(map((res: any) => {
            ShellComponent.hideLoader();
            return res.json();
          })).pipe(catchError((error:any) => {
            console.log(error);
            ShellComponent.hideLoader();
            return error;
    }));
  }

  updateMerchant(request: any): Observable<any> {
    ShellComponent.showLoader();
    let headers = new Headers();
    headers.append("Content-Type","application/json");
    let body: any = JSON.stringify(request);
    return this.http.post(this.baseUrl+"onboarding",body,{headers})
          .pipe(map((res: any) => {
            ShellComponent.hideLoader();
            return res.json();
          })).pipe(catchError((error:any) => {
            console.log(error);
            ShellComponent.hideLoader();
            return error;
    }));
  }

  createCustomer(request: any): Observable<any> {
    ShellComponent.showLoader();
    let headers = new Headers();
    headers.append("Content-Type","application/json");
    return this.http.post("http://79.125.49.36:8080/digibase-api/customer/create-business-customer",request,)
          .pipe(map((res: any) => {
            ShellComponent.hideLoader();
            return res.json();
          })).pipe(catchError((error:any) => {
            console.log(error);
            ShellComponent.hideLoader();
            return error;
      }));
  }

  getImageData(fileID:string, customerID: string): Observable<any> {
    ShellComponent.showLoader();
    let headers = new Headers();

    ShellComponent.hideLoader();
    return this.http.get(this.baseUrl+`file/downloadFile?fileID=`+fileID+"&customerID="+customerID, { responseType: ResponseContentType.Blob})
          .pipe(map((result) => {
            return result.blob();
          })).pipe(catchError((error:any) => {
            console.log(error);
            ShellComponent.hideLoader();
            return error;
    }));
  }
}
