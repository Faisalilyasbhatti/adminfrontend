import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyFormatService {

  constructor(private httpClient: HttpClient){}

  public getCurrencies(): Observable<any> {
    return this.httpClient.get("./assets/currency_formats/currencies.json");
  }

  public getFormats(): Observable<any> {
    return this.httpClient.get("./assets/currency_formats/formats.json");
  }
}
