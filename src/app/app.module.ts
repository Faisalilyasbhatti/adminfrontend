import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ShellModule } from './shell/shell.module';
import { routing }  from './app.routing';
import { AppComponent } from './app.component';
import { DashboardeModule } from './module/dashboard/dashboard.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RequestOptions, XHRBackend } from '@angular/http';
import { HttpModule, JsonpModule } from '@angular/http';
import { HttpService } from './util/http/securehttp.service';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { LoginModule } from './auth/login/login.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { UserModule } from './module/user/user.module';
import { RoleModule } from './module/role/role.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ExcelService } from './file-saver/excel.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MerchantModule } from './module/merchant/merchant.module';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ModalModule.forRoot(),
    ShellModule,
    routing,
    DashboardeModule,
    LoginModule,
    NgxUiLoaderModule,
    UserModule,
    MerchantModule,
    RoleModule,
    HttpModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [{
      provide: HttpService,
      useFactory: (backend: XHRBackend, options: RequestOptions) => {
        return new HttpService(backend, options);
      },
      deps: [XHRBackend, RequestOptions]
    },
    ExcelService,
  ],
  schemas: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
