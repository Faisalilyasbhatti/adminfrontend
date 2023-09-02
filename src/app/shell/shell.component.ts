import { Component, ViewEncapsulation, AfterViewInit } from '@angular/core';
declare var require : any;
declare var $: any;
import { AuthorizationService } from '../_services/authorization.service';

import {
  Router,
  ActivatedRoute,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'shell',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './shell.html',
  providers:[]
})

export class ShellComponent implements AfterViewInit{

  loading: boolean = true;
  public isLogin: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthorizationService) {
    if(!this.isLoggedIn()) {
      window.location.href = "#/login";
    }
    this.router.events.subscribe(x => this.navigationInterceptor(x))
  }
  ngAfterViewInit() {}
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loading = true;
    }
    if (event instanceof NavigationEnd) {
      this.loading = false;
      $("select").formSelect();
    }
    if (event instanceof NavigationCancel) {
      this.loading = false;
    }
    if (event instanceof NavigationError) {
      this.loading = false;
    }
  }

  public static showLoader() {
    $(".overlay").show();
  }

  public static hideLoader() {
    $(".overlay").hide();
  }
  //check user login
  isLoggedIn() {
    return this.authService.isUserLoggedIn();
  }

}
