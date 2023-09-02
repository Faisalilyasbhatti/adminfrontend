import { NgModule, CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { Data } from '../providers/data';
import { routing }       from './shell.routing';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ShellComponent } from './shell.component';
import { MenuComponent } from '../shell/menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoggedInGuard } from '../auth/login/guard/login.guard';
import { AuthorizationGuard } from '../auth/authorization/guard/authorization.guard';
import { DatePipe } from '@angular/common';
import { PagerService } from '../_services/index';
import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
// import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { LoginComponent } from '../auth/login/component/login.component';
import { NgxUiLoaderConfig ,NgxUiLoaderModule, NgxUiLoaderRouterModule} from 'ngx-ui-loader';
// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http);
// }
let config: NgxUiLoaderConfig = {
  bgsColor: 'red',
  bgsOpacity: 0.5,
  bgsPosition: 'bottom-right',
  bgsSize: 60,
  bgsType: 'ball-spin-clockwise',
  blur: 5,
  delay: 0,
  fastFadeOut: true,
  fgsColor: '#045481',
  fgsPosition: 'center-center',
  fgsSize: 60,
  fgsType: 'cube-grid',
  gap: 24,
  logoPosition: 'center-center',
  logoSize: 120,
  logoUrl: '',
  masterLoaderId: 'master',
  overlayBorderRadius: '0',
  overlayColor: 'rgba(40,40,40,0.3)',
  pbColor: '#045481',
  pbDirection: 'ltr',
  pbThickness: 3,
  hasProgressBar: true,
  text: '',
  textColor: '#FFFFFF',
  textPosition: 'center-center',
  maxTime: -1,
  minTime: 300
}

@NgModule({
  imports: [
   	CommonModule,
    FormsModule,
    ReactiveFormsModule,
   	routing,
    NgxUiLoaderModule.forRoot(config),
    NgxUiLoaderRouterModule,
    HttpClientModule,
    // TranslateModule.forRoot({
    //   loader: {
    //     provide: TranslateLoader,
    //     useFactory: HttpLoaderFactory,
    //     deps: [HttpClient]
    //   }
    // })
  ],

  declarations: [
  	ShellComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent
  ],

  providers : [
    Data,
    DatePipe,
    LoggedInGuard,
    AuthorizationGuard,
    LoginComponent,
    PagerService
  ],
  exports: [
  	ShellComponent,
    // TranslateModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})

export class ShellModule {
}
