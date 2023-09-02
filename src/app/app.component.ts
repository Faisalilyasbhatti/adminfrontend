import { Component } from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import { UserIdleService } from 'angular-user-idle';

@Component({
  selector: 'app-root',
  template: `<shell></shell>`
})
export class AppComponent {
  title = 'app';

  constructor(private userIdle: UserIdleService) {
  }

  ngOnInit() {}
}
