import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError,map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { SystemConstants } from '../module/system/system.constants';
import { HttpService } from '../util/http/securehttp.service';
import { Headers } from '@angular/http';
import { ScriptLoaderService } from './script-loader.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  public defaultWarehouseSelected: EventEmitter<any> = new EventEmitter<any>();
  private baseUrl = environment.API_URL;
  private headers = SystemConstants.header;

  constructor(private router: Router, private scriptLoaderService: ScriptLoaderService) { }

  hasPermission(key: string){
    let permissions = this.getLocalStorageItem('permissions');
    return permissions[key];
  }

  initializeAuthorization(user: any){
    let permissions = {};
    for (const role of user.roleVos) {
      for (const permission of role.permissionVos) {
        permissions[permission.code] = true;
      }
    }
    let _user = {
      id: user.userID,
      email: user.email,
      firstName: user.firstName == null? '': user.firstName,
      lastName: user.lastName == null? '': user.lastName
    };
    this.setLocalStorageItem('permissions',permissions);
    this.setLocalStorageItem('user',_user);
  }

  isUserLoggedIn(){
    return this.getLocalStorageItem('user') == null? false: true;
  }

  logout(){
    this.scriptLoaderService.clearAll();
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

  getLocalStorageItem(key: string){
    let data = localStorage.getItem(SystemConstants.b64EncodeUnicode(key));
    if(data == null)
      return null;
    return JSON.parse(SystemConstants.b64DecodeUnicode(data));
  }

  setLocalStorageItem(key: string, value: any){
    localStorage.setItem(SystemConstants.b64EncodeUnicode(key), SystemConstants.b64EncodeUnicode(JSON.stringify(value)));
  }

  getLoggedInUser(){
    return this.getLocalStorageItem('user');
  }

  getToken(){
    return localStorage.getItem(SystemConstants.b64EncodeUnicode('auth_token'));
  }

  setToken(token){
    localStorage.setItem(SystemConstants.b64EncodeUnicode('auth_token'), token);
  }

  getRefreshToken(){
    return localStorage.getItem(SystemConstants.b64EncodeUnicode('refresh_token'));
  }

  setRefreshToken(refreshToken){
    localStorage.setItem(SystemConstants.b64EncodeUnicode('refresh_token'), refreshToken);
  }
  isAdminUser() {
    return (localStorage.getItem("adminUser") == "true");
  }
}
