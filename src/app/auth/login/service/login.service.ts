import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { HttpService } from '../../../util/http/securehttp.service';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

@Injectable()
export class LoginService {
  constructor(private http: HttpService) {}

  private baseUrl = environment.API_URL;

  userLogin(userEmail: string, password: string) :Observable<any> {
    let headers = new Headers();
    headers.append("Content-Type","application/json");
    let body = JSON.stringify({"loginId":userEmail, "password":password});
    return this.http.post(this.baseUrl+"user/login", body, {headers}).pipe(
          map((res: any) => {
            return JSON.parse(res._body);
          })).pipe(catchError((error:any) => {
            console.log(error);
            return error;
    }));
  }

  changePassword(username: string, password: string, newPassword: string): Observable<any> {
      let headers = new Headers();
      headers.append("Content-Type","application/json");
      let body = JSON.stringify({"userEmail":sessionStorage.getItem("userEmailAdmin"), "password":password, "newPassword":newPassword});
      return this.http.post(this.baseUrl+"user/service/change/password", body, {headers})
            .pipe(map((res) => {
              return res;
            })).pipe(catchError((error:any) => {
              console.log(error);
              return error;
      }));
  }
}
