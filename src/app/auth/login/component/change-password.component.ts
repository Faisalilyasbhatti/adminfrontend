import { Component, ViewChild, OnInit, AfterViewInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Data } from '../../../providers/data';
import { DatePipe } from '@angular/common';
import { LoginService } from '../service/login.service';
declare var $: any;

@Component({
  moduleId: module.id,
  selector: 'change-password',
  templateUrl: './changePassword.html',
  providers:[LoginService]
})

export class ChangePasswordComponent implements OnInit, AfterViewInit {
  public password:string;
  public newPassword: string;
  public confirmPassword: string;
  public userName: string;
  public isError: boolean = false;
  public errorMessage = "";
  public userEmail: string;

  constructor(private router: Router, private route: ActivatedRoute, private datePipe: DatePipe,
              private translate: TranslateService, private data: Data, private loginService: LoginService) {
              this.route.queryParams.subscribe(param=>{
                  //getting queryparam value
              });
  }

  ngOnInit() {
    this.userName = localStorage.getItem("userName");
    this.userEmail = sessionStorage.getItem("userEmailAdmin");
  }
  ngAfterViewInit() {}

  onSubmit() {
  if(this.validateForm()) {
    this.changePassword();
  }
  }
  //user change password
  changePassword() {
    this.loginService.changePassword(this.userEmail, this.password, this.newPassword).subscribe((result) => {
      if(result.responseCode === 'PDM_SUCCESS_00' && result.responseData != null) {
        // this.isLogin = true;
        sessionStorage.setItem("isLogin", "true");
        window.location.href="#/dashboard";
        // this.router.navigate(["#/dashboard"]);
      } else {
        this.isError = true;
        this.errorMessage = "Invalid username or password provided";
      }
      },error =>{console.log("Error Occured : "+error)
    });
  }
  //validate login form data
  validateForm() : boolean{
    this.isError = false;
    this.errorMessage = "";
    if(this.password == "") {
      this.isError = true;
      this.errorMessage = "Please enter valid password";
      return false;
    } else if(this.newPassword != this.confirmPassword) {
      this.isError = true;
      this.errorMessage = "Please enter valid password";
      return false;
    }
    return true;
  }

}
