import { Role } from '../../role/model/role';
export class User {
  public userID: number;
  public userName: string;
  public status: number;
  public firstName: string;
  public lastName: string;
  public password: string;
  public country:string;
  public city:string;
  public zipcode:string;
  public idDocNum: string;
  public cellPhoneNum: string;
  public middleName: string;
  public addressLine1: string;
  public addressLine2: string;
  public email: string;
  public roleVos : Role[];
  public createdBy: any;
  public createdDate: string;
  public updatedDate: string;
  public updatedBy: string;
}
