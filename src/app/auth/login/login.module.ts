import { NgModule } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LoginComponent } from './component/login.component';
import { LoginService } from './service/login.service';
import { ChangePasswordComponent } from './component/change-password.component';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule ({
  imports: [
   		CommonModule,
    	FormsModule,
			HttpClientModule,
	    TranslateModule.forRoot({
	      loader: {
	        provide: TranslateLoader,
	        useFactory: HttpLoaderFactory,
	        deps: [HttpClient]
	      }
	    })
   	],
  providers:[LoginService],
  declarations: [
    LoginComponent,
    ChangePasswordComponent
  ],
  exports: [
    LoginComponent,
    ChangePasswordComponent
  ]
})
export class LoginModule { }
