import { Component, OnInit, AfterViewInit } from '@angular/core'
import { Router,ActivatedRoute } from '@angular/router';
declare var $: any;
import { AuthorizationService } from '../../_services/authorization.service';
import { ScriptLoaderService } from '../../_services/script-loader.service';

@Component({
  moduleId: module.id,
  selector: 'app-menu',
  templateUrl: './menu.html'
})

export class MenuComponent implements OnInit, AfterViewInit {
  public link: string;
  public userName: string="Nand Khatri";
  public lan: string;

  constructor(private router: Router, private scriptLoader: ScriptLoaderService, private route: ActivatedRoute, private authorizationService: AuthorizationService) {
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.scriptLoader.loadAll();
  }

  isAdmin() {
    return this.authorizationService.isAdminUser();
  }

  isPermitted(code: string) {
    return this.authorizationService.hasPermission(code);
  }
}
