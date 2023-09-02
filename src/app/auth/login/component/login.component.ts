import { Component, ViewChild, OnInit, AfterViewInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Data } from '../../../providers/data';
import { DatePipe } from '@angular/common';
import { LoginService } from '../service/login.service';
import { User } from '../../../module/user/model/user';
import { Role } from '../../../module/role/model/role';
import { Permission } from '../model/permission';
import { environment } from '../../../../environments/environment';
import { DAOResponse } from '../../../util/response/response';
import { AuthorizationService } from '../../../_services/authorization.service';
declare var $: any;

@Component({
  moduleId: module.id,
  selector: 'user-login',
  templateUrl: './userLogin.html',
  styleUrls: ['./login.component.css'],
  providers:[LoginService]
})

export class LoginComponent implements OnInit, AfterViewInit {
  public userEmail:string;
  public password:string;
  public newPassword: string;
  public isLogin: boolean;
  public isError: boolean = false;
  public errorMessage = "";
  public user: User;
  public permissions : any[];

  constructor(private router: Router, private route: ActivatedRoute, private datePipe: DatePipe,
              private data: Data, private loginService: LoginService, private authorizationService: AuthorizationService) {
              this.route.queryParams.subscribe(param=>{
                  //getting queryparam value
              });
    if(this.authorizationService.isUserLoggedIn()) {
      if(window.location.hash === '#/login') {
        if (this.authorizationService.isAdminUser()) {
          window.location.href="#/dashboard";
        } else {
          window.location.href="#/merchant-dashboard";
        }
      } else {
          window.location.href=window.location.hash;
      }
    }
  }

  ngOnInit() {  }
  ngAfterViewInit() {}

  onSubmit() {
    this.validateForm();
    if(!this.isError) { this.login(); }
  }
  //user login
  login() {
    this.loginService.userLogin(this.userEmail, this.password).subscribe((result) => {
      console.log(result);
      if(result.code === DAOResponse.SUCCESS && result.responseData != null) {

        this.isLogin = true;
        this.user = result.responseData.user;

        sessionStorage.setItem("isUserLoggedInAdmin", "true");
        localStorage.setItem("userName", this.user.userName);
        sessionStorage.setItem("userEmailAdmin", this.user.email);
        localStorage.setItem("firstName", this.user.firstName);
        // localStorage.setItem("adminUser", this.user.adminUser.toString());
        localStorage.setItem("lastName", this.user.lastName);
        localStorage.setItem("userID", this.user.userID.toString());
        localStorage.setItem("cellNum",this.user.cellPhoneNum);
        localStorage.setItem("middleName",this.user.middleName);
        localStorage.setItem("address1",this.user.addressLine1);
        localStorage.setItem("address2",this.user.addressLine2);
        localStorage.setItem("city",this.user.city);
        localStorage.setItem("country",this.user.country);
        localStorage.setItem("zipCode",this.user.zipcode);
        localStorage.setItem("NicNum",this.user.idDocNum);

        this.authorizationService.initializeAuthorization(this.user);
        window.location.href="#/dashboard";
      } else {
        this.isError = true;
        this.errorMessage = "Invalid username or password provided";
        $(".overlayLogin").hide();
      }
      },error =>{console.log("Error Occured : "+error)
    });
  }
  //validate login form data
  validateForm() {
    this.isError = false;
    this.errorMessage = "";
    if(this.userEmail !== undefined && this.userEmail !== null && this.userEmail !== "" ) {
      if(this.userEmail.trim().length !== 0 && this.userEmail.trim().length === this.userEmail.length) {

      } else {
        this.isError = true;
        this.errorMessage = "Please enter valid username";
        return;
      }
    } else {
      this.isError = true;
      this.errorMessage = "Please enter valid username";
      return;
    }
    if(this.password == "" || this.password.trim().length == 0) {
      this.isError = true;
      this.errorMessage = "Please enter valid username";
      return;
    }
  }
}
