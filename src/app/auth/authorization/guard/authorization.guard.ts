import { Injectable, Inject} from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { LoginComponent } from '../../login/component/login.component';
import { DOCUMENT } from "@angular/common";
import { AuthorizationService } from '../../../_services/authorization.service';

@Injectable()
export class AuthorizationGuard implements CanActivate {

  private code: string;
  private isPermitted: boolean;

  constructor( @Inject(DOCUMENT) private document:any, private authorizationService: AuthorizationService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    let permission = route.data['permission'];
    if (this.authorizationService.isUserLoggedIn()) {
      let isPermitted = this.authorizationService.hasPermission(permission);
      if(!isPermitted) {
        this.router.navigate(['/dashboard']);
        return false;
      }
      return true;
    }
    return false;
  }

}
