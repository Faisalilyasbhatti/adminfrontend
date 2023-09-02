import {Injectable} from '@angular/core';
import {Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, mergeMap, catchError } from 'rxjs/operators';;
import { environment } from '../../../environments/environment';
import { throwError } from 'rxjs';

@Injectable()
export class HttpService extends Http {
  static isWorking: boolean = false;

  constructor (backend: XHRBackend, options: RequestOptions) {
    // let token = localStorage.getItem('adminAccessToken'); // your custom token getter function here
    // options.headers.set('x-access-token', `PAN ${token}`);
    super(backend, options);
    // console.log("token : "+token);
  }

  request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
    let token = localStorage.getItem('adminAccessToken');
    if (typeof url === 'string') { // meaning we have to add the token to the options, not in url
      if (!options) {
        // let's make option object
        options = {headers: new Headers()};
      }
      // options.headers.set('x-access-token', `PAN ${token}`);
    } else {
    // we have to add the token to the url object
      // url.headers.set('x-access-token', `PAN ${token}`);
    }
    return super.request(url, options).pipe(catchError(this.catchAuthError(this, url, options)));
  }

  private catchAuthError (self: HttpService, url: string|Request, options?: RequestOptionsArgs) {
    return (res: Response) => {
      if(res.status === 401 && !HttpService.isWorking && url !== null) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('refresh_token', localStorage.getItem("adminRefreshToken"));
        let body = this.b64EncodeUnicode(JSON.stringify({ "sourceSystem": "Admin",
         "userEmail": sessionStorage.getItem("userEmailAdmin"),
         "refresh_token": localStorage.getItem("adminRefreshToken")}));
        body = JSON.stringify({ "input": body.toString() });

        HttpService.isWorking = true;
        return this.post(environment.API_URL + "admin-token-refresh",
            body,
            { headers }
          )
          .pipe(map((res) => {
            if (res.headers.get("auth_token")) {
              var token = res.headers.get('auth_token');
              localStorage.setItem('adminAccessToken', token);

              HttpService.isWorking = false;
              return null;
            }
            HttpService.isWorking = false;

            return throwError(res);

          }))
          .pipe(mergeMap(x => self.request(url, options)))
          .pipe(catchError((error: Response) => {
            HttpService.isWorking = false;
            if (res.status === 401 || res.status === 403 ) {
              sessionStorage.clear();
              localStorage.clear();
              //localStorage.setItem('lan', lan);
              window.location.href = "#/login";
              window.location.reload();
            }
            return throwError(error);
          }));
      }

      return throwError(res);
    };
  }

  b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
      return String.fromCharCode(parseInt(p1, 16))
    }))
  }

 b64DecodeUnicode(str) {
   return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
       return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
   }).join(''))
 }
}
