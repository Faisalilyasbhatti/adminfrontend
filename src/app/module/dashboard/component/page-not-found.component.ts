import { Component, OnInit, AfterViewInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LoginComponent } from '../../../auth/login/component/login.component';
declare var $: any;

@Component({
  moduleId: module.id,
  selector: 'page-not-found',
  templateUrl: './pageNotFound.html'
})
export class PageNotFoundComponent implements OnInit, AfterViewInit {
  constructor(private router: Router, private route: ActivatedRoute, private translate: TranslateService, private loginComponent: LoginComponent) {
  }

  ngOnInit() {}
  ngAfterViewInit() {}
}
