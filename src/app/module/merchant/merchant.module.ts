import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MerchantRoutingModule } from './merchant-routing.module';
import { MerchantListComponent } from './component/list/merchant-list/merchant-list.component';
import { HttpClientModule } from '@angular/common/http';
import { MerchantDetailComponent } from './component/detail/merchant-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MerchantDetailResolver } from './resolver/merchant-detail.resolver';
import { PendingMerchantListComponent } from './component/list/merchant-list/pending-merchant-list.component';


@NgModule({
  declarations: [MerchantListComponent, MerchantDetailComponent, PendingMerchantListComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MerchantRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[MerchantDetailResolver]
})
export class MerchantModule { }
