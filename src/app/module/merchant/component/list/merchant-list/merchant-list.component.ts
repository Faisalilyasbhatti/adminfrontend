import { Component, OnInit } from '@angular/core';
import { Merchant } from '../../../model/merchant';
import { MerchantService } from '../../../service/merchant.service';
import { Data } from '../../../../../providers/data';
import { PagerService } from '../../../../../_services/index';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

declare var $: any;
import * as _ from 'underscore';

@Component({
  selector: 'app-merchant-list',
  templateUrl: './merchant-list.component.html',
  styleUrls: ['./merchant-list.component.css']
})
export class MerchantListComponent implements OnInit {
  public merchants: Merchant[] = new Array<Merchant>();
  public merchant : Merchant;
  pager: any = {};
  pagedItems: any[];
  public page: number = 0;

  constructor(private merchantService: MerchantService,private pagerService: PagerService, private router: Router, private data: Data) { }

  ngOnInit(): void {
    this.getMerchants();
  }

  getMerchants() {
    this.merchantService.getMerchants(1).subscribe((result)=> {
      if(result != null && result.responseData != null) {
        this.merchants = result.responseData.customer;
        if(this.merchants === null) {
          this.merchants = new Array();
        }

      }
      else{
        this.merchants = new Array();
      }
    //   setTimeout(()=>{
    //     $("#data-table-simple").DataTable({
    //       responsive: !0,
    //       bLengthMenu:false,
    //       searching:false,
    //       language:false,
    //       bLengthChange: false});
    // },50);
    }, error => {console.log(error);})

  }
  
//   setPage(page: number) {
//     if (page < 1 || page > this.pager.totalPages) {
//       return;
//     }
//     this.pager = this.pagerService.getPager(this.merchants.length, page, 10);
//     this.pagedItems = this.merchants.slice(this.pager.startIndex, this.pager.endIndex + 1);
// }

editUserDetail(merchant: any) {
  let navigationExtras: NavigationExtras = {
      queryParams : {
        "mode": "Edit"
      }
    }
      this.data.storage = {
        email: merchant.accountVo.email,
        pending: false
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
