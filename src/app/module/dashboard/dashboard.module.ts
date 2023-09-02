import { NgModule } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DashboardComponent } from './component/dashboard.component';
import { PageNotFoundComponent } from './component/page-not-found.component';

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
  declarations: [
    DashboardComponent,
    PageNotFoundComponent
  ],
  exports: [
    DashboardComponent,
    PageNotFoundComponent
  ]
})
export class DashboardeModule {

}
