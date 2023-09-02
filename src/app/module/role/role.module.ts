import { NgModule } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { RoleListComponent } from './component/list/role-list.component';
import { RoleService } from './service/role.service';
import { RoleDetailComponent } from './component/detail/role-detail.component';


@NgModule ({
  imports: [
       CommonModule,
       FormsModule,
       ReactiveFormsModule
   	],
  providers:[RoleService],
  declarations: [
    RoleListComponent,
    RoleDetailComponent
  ],
  exports: [
    RoleDetailComponent,
    RoleListComponent

  ]
})
export class RoleModule {}
