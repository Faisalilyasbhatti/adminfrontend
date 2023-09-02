import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthorizationService } from '.././../../_services/authorization.service';
import { DOCUMENT } from "@angular/common";

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private authService: AuthorizationService, private router: Router) {}

  canActivate() {

	if (!this.authService.isUserLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
