import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MerchantService } from '../service/merchant.service';
import { Data } from '../../../providers/data';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class MerchantDetailResolver implements Resolve<any> {
  constructor(private merchantService: MerchantService, private data: Data) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if(this.data.storage){
      let email = this.data.storage.email;
      if (email != undefined && email != null) {
        let requests = [this.merchantService.getSelectedMerchant(encodeURIComponent(email))];
        return forkJoin(requests).pipe(map((res) => {
          let response = {
            merchantDetail : res[0]
          }
          return response;
        }));
      }
    // let email = this.data.storage.email;
    // if (email != undefined && email != null) {
    //   let requests = [this.merchantService.getSelectedMerchant(email)];
    //   return forkJoin(requests).pipe(map((res) => {
    //     let response = {
    //       merchantDetail : res[0],
    //       pending: this.data.storage.pending
    //     }
    //     return response;
    //   }));

    }
   
  }


}
