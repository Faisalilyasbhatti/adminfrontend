import { NgModule } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { UserDetailComponent } from './component/detail/user-detail.component';
import { UserListComponent } from './component/list/user-list.component';
import { UserService } from './service/user.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule ({
  imports: [
   		CommonModule,
      HttpClientModule,
	    TranslateModule.forRoot({
	      loader: {
	        provide: TranslateLoader,
	        useFactory: HttpLoaderFactory,
	        deps: [HttpClient]
	      }
	    }),
      FormsModule,
      ReactiveFormsModule
    ],
  providers:[UserService],
  declarations: [
    UserDetailComponent,
    UserListComponent
  ],
  exports: [
    UserDetailComponent,
    UserListComponent
    
  ]
})
export class UserModule {}
