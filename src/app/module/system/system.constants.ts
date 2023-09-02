import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpError } from '../../util/http/error';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Injectable()
export class SystemConstants {

  public static headers = new HttpHeaders({"Content-Type": "application/json","Access-Control-Allow-Origin":"*","Authorization":"Bearer "+localStorage.getItem('authToken')});
  public static header = new HttpHeaders({"Content-Type":"application/json"});
  public static serialNumber = new RegExp('(^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9\-]{4,25}$)|(^(?=.*[0-9])[0-9\-]{4,25}$)')//new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9\-]{4,25}$');

  /*
  method to check source System
  if code is LumixGPro then return LumixProClub
  else return code
  */
  public static getSourceSystemName(code: string) {
    if(code === "")
      return "";
    else {
      let sourceSystem = sessionStorage.getItem(code);
      if(sourceSystem == undefined || sourceSystem == null || sourceSystem === '') {
        return code;
      } else {
        return sourceSystem;
      }
    }
  }

  // method to encode string into base64
  public static b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
      return String.fromCharCode(parseInt(p1, 16))
    }))
  }

  public static b64DecodeUnicode(str: string) {
    return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
  }

   // method formate date in DD/MM/YYYY
  public static formateDate(date: any, datePipe) {
    try {
        //date !== null && date !== ""? datePipe.transform(date, 'dd/MM/yyyy') !== null ? datePipe.transform(date, 'dd/MM/yyyy').toString(): "": "";
       if(date !== "" && date !== undefined && date !== null) {
         date =moment(date).format("DD/MM/YYYY");
         let dateArr : string[] = date.split("/");
         if(dateArr !== undefined && dateArr.length > 2) {
           return  Number(dateArr[2]) > 1950 ? date:"";
         } else {
           return date;
         }
       }
    } catch {
      console.error("Invalid date formate");
    }
  }

  // method formate date in DD/MM/YYYY hh:mm a
 public static formateDateTime(date: any, datePipe) {
   try {
       //date !== null && date !== ""? datePipe.transform(date, 'dd/MM/yyyy') !== null ? datePipe.transform(date, 'dd/MM/yyyy').toString(): "": "";
      if(date !== "" && date !== undefined && date !== null) {
        date =moment(date).format("DD/MM/YYYY hh:mm");
        let dateArr : string[] = date.split("/");
        return date;
      }
   } catch {
     console.error("Invalid date formate");
   }
 }

  public static emailRegex = new RegExp('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$');
  public static nameRegex = new RegExp('^([A-Za-z0-9]{1,15}) ?([A-Za-z0-9]{1,15})$');
  public static inputSanitization_xss = new RegExp('<(|\/|[^\/>][^>]+|\/[^>][^>]+)>');
  public static inputSanitization_sql = new RegExp('\b(ALTER|CREATE|DELETE|DROP|EXEC(UTE){0,1}|INSERT( +INTO){0,1}|MERGE|SELECT|UPDATE|UNION( +ALL){0,1})\b');
  // public static inputSanitization_sql2 = new RegExp('(CREATE|ALTER|DROP|SELECT|DECLARE|INSERT\s+INTO|UPDATE\s+\S+\s+SET|DELETE\s+FROM|EXEC(UTE){0,1}|UNION(\s+ALL){0,1})');
  // public static htmlEscaper = new RegExp('[!@#$%^&*()`?":\'{}|<>]');
  public static htmlEscaper = new RegExp('[&\']');

  // method to sanitize html and xss
  public static sanitycheck(text: string) : boolean {
  		var isValidText = true;
  		if(SystemConstants.inputSanitization_xss.test(text) || SystemConstants.htmlEscaper.test(text)) {
  			isValidText = false;
  		// } else if(SystemConstants.inputSanitization_sql2.test(text) || SystemConstants.htmlEscaper.test(text)) {
  		// 	isValidText = false;
  		// } else if(SystemConstants.inputSanitization_sql2.test(text.toUpperCase())) {
      //   isValidText = false;
      }
		return isValidText;
  }

  public static httpFailed() :Observable<any>{
    let httpError = new HttpError("HTTP_FAILED", "Http request failed");
    let observableResponse = new Observable((observer) => {
      observer.next(httpError);
    })
    return observableResponse;
  }
  public static validateDate(fromDate:Date, toDate: Date) {
    try {
      if(fromDate <= toDate) {
        return true;
      }
    } catch(e) {}
    return false;
  }
  public static getMonthDifference(fromDate:Date, toDate: Date) {
    try {
      return toDate.getMonth() - fromDate.getMonth();
    } catch(e) {}
    return -1;
  }
}
