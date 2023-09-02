import { Component, OnInit } from '@angular/core';
import { Merchant } from '../../../model/merchant';
import { MerchantService } from '../../../service/merchant.service';
import { Data } from '../../../../../providers/data';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

declare var $: any;
import * as _ from 'underscore';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-merchant-list',
  templateUrl: './pending-merchant-list.component.html',
  styleUrls: ['./merchant-list.component.css']
})
export class PendingMerchantListComponent implements OnInit {
  public merchants: Merchant[] = new Array<Merchant>();
  public merchant : Merchant;
  pager: any = {};
  pagedItems: any[];
  public page: number = 0;

  constructor(private merchantService: MerchantService, private router: Router, private data: Data,
    public ngxLoader: NgxUiLoaderService,) { }

  ngOnInit(): void {
    this.getMerchants();
  }

  getMerchants() {
    // this.ngxLoader.start();
    this.merchantService.getMerchants(0).subscribe((result)=> {
      if(result != null && result.responseData != null) {
        this.merchants = result.responseData.customer;
        if(this.merchants === null) {
          this.merchants = new Array();
          
        }
      }
      // this.ngxLoader.stop();
      // setTimeout(() => {
      //   $("#data-table-simple").DataTable({
      //     responsive: !0,
      //     bLengthMenu: false,
      //     searching: false,
      //     language: false,
      //     bLengthChange: false
      //   });
      // }, 500);
      // this.ngxLoader.stop();
    }, error => {console.log(error);})
  }
  
editUserDetail(merchant: any) {
  let navigationExtras: NavigationExtras = {
      queryParams : {
        "mode": "Edit"
      }
    }
      this.data.storage = {
        email: merchant.accountVo.email,
        pending: true
      }
    this.router.navigate(['merchant','detail'], navigationExtras);
}


viewUserDetail(merchant: any) {
  let navigationExtras: NavigationExtras = {
      queryParams : {
        "mode": "View"
      }
    }
      this.data.storage = {
        email: merchant.account.email
      }
    this.router.navigate(['merchant','detail'], navigationExtras);
}

}
