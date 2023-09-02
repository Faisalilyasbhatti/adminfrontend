import { Component, OnInit, AfterViewInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { LoginComponent } from '../../../auth/login/component/login.component';
import { Dashboard } from '../model/dashboard';
import { Count } from '../model/count';
import { DashboardService } from '../service/dashboard.service';
import { ShellComponent } from '../../../shell/shell.component';
import { SystemConstants } from '../../system/system.constants';
declare var $: any;
import * as moment from 'moment';

@Component({
  moduleId: module.id,
  selector: 'dashboard',
  templateUrl: './dashboard.html',
  providers:[DashboardService]
})
export class DashboardComponent implements OnInit, AfterViewInit {

  constructor() {
  }

  ngOnInit() {
    //this.getNscs();
  }
  ngAfterViewInit() {}

}
