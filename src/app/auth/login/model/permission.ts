export class Permission {

  public code:string;
  public status:boolean = false;

  constructor(code:string, status:boolean) {
    this.code = code;
    this.status = status;
  }
}
