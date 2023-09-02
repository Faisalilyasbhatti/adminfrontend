import { Component, OnInit, AfterViewInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../model/user';
import { Role } from '../../../role/model/role';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { Data } from '../../../../providers/data';
import * as _ from 'underscore';
declare var $: any;


const trimValidator: ValidatorFn = (control: FormControl) => {
  if (control.value.startsWith(' ')) {
    return {
      'trimError': { value: 'control has leading whitespace' }
    };
  }
  if (control.value.endsWith(' ')) {
    return {
      'trimError': { value: 'control has trailing whitespace' }
    };
  }

  return null;
};

@Component({
  selector: 'user-detail',
  templateUrl: './userDetail.html',
  providers:[UserService]
})

export class UserDetailComponent implements OnInit, AfterViewInit {
  public mode: string = "Add";
  public roles: Role[];
  public selectedRoles: Role[];
  public user: User;
  public message: string;
  public isSuccess: boolean = false;
  public isError: boolean = false;
  public disable: boolean = false;
  public passwordDisable: boolean = false;
  public isEditCustomer: boolean = false;
  public isDeleteCustomer: boolean = false;
  public customerEditRole: Role;
  public customerDeleteRole: Role;
  public firstName:String;
  public lastName:String;
  public email:String;
  public role:String;
  public userId:number;

  constructor(private userService: UserService, private data: Data , private route: ActivatedRoute) {

    this.route.queryParams.subscribe(params => {
      if(params["mode"] != null) {
          this.mode = params["mode"];
          if(this.mode == "Edit") {
						if((this.data.storage != undefined || this.data.storage != null)){
              this.form.controls.email.disable();
              this.form.controls.password.disable();
						} else {
							window.location.href="#/user/list";
							return;
						}
					} else if (this.mode == "View"){
						if((this.data.storage != undefined || this.data.storage != null)){
              this.form.disable();
						} else {
							window.location.href="#/user/list";
							return;
						}
					} else {
            return;
          }
          this.user = this.data.storage.user;
          this.selectedRoles = this.user.roleVos;
          this.selectedRoles = _.sortBy(this.selectedRoles, 'code');
        }
      });
  }

  ngOnInit() {
    if(this.user == null) {
      this.user = new User();
      this.selectedRoles = new Array();
    }
    else{
      let userObj=this.user;
      this.firstName=userObj.firstName;
      this.lastName=userObj.lastName;
      this.userId=userObj.userID;
      this.email=userObj.email;
      let obj=userObj.roleVos;
      let selected=userObj.status;
      this.role = _.sortBy(obj, 'code');
      this.form.get("firstName").setValue(this.user.firstName);
      this.form.get("lastName").setValue(this.user.lastName);
      this.form.get("email").setValue(this.user.email);
      this.form.get("role").setValue(this.role);
      this.form.get("status").setValue(this.user.status);
      // this.roles = new Array();

    }
    this.getRoles();
  }

  submitted = false;
  form = new FormGroup({
    firstName: new FormControl("", [Validators.required,Validators.minLength(3),trimValidator]),
    lastName: new FormControl("", [Validators.required,Validators.minLength(3),trimValidator]),
    status:new FormControl(""),
    email: new FormControl("",[
      Validators.required,
      Validators.email
    ]),
    password: new FormControl("",[
      Validators.required,
      Validators.minLength(8),
      // Validators.pattern("/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/")
    ]),
    role: new FormControl({value:'', disabled:this.disable})
   });


   get f() { return this.form.controls; }

   ngAfterViewInit(){
    setTimeout(()=>{
      $('.chips').chips({
        disbaled:true
      });
    },500);
  }



  onSubmit(){
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.user = this.form.value;
    this.user.userID=this.userId === undefined ? null : this.userId;
    this.user.email=this.form.value.email  === undefined ? this.email : this.form.value.email;
    this.user.roleVos = this.selectedRoles;
    this.user.status = this.user.status?1:0;
    this.saveUser();
  }

  saveUser() {
    if(this.user.roleVos.length>0){
    this.userService.saveUser(this.user).subscribe((result)=>{
      if(result != null && result.code === 'EVS_SUCCESS_00') {
        this.isSuccess = true;
        this.message = "User created SuccessFully";
        this.form.disable();
      } else if(result.code === 'EVS_ERROR_06') {
        this.isError = true;
      } else {
        this.isError = true;
        this.message = "Some thing went wrong";
      }
    },error => {console.log(error)});
  }
  }

  getRoles() {
    this.userService.getRoles().subscribe((result) => {
        if(result != null && result.responseData != null) {
            this.roles = result.responseData.roles;
            if(this.roles != null && this.roles.length > 0) {
              this.roles = _.sortBy(this.roles, 'code');
              this.orderSelectedRoles();
            }
        }
    }, error => {console.log(error)});
  }


  //add role to selectedRoles
  addRole(role: any) {
    // this.removeMessages("roles");
    this.selectedRoles.push(role);
    this.selectedRoles = _.sortBy(this.selectedRoles, 'code');
    this.roles.splice(this.roles.indexOf(role), 1);
  }
  // remove role from selectedRoles
  removeRole(role: any) {
    this.roles.push(role);
    this.selectedRoles.splice(this.selectedRoles.indexOf(role), 1);
    this.roles = _.sortBy(this.roles, 'code');
  }
  //odering selected roles
  orderSelectedRoles() {
    if(this.selectedRoles != null && this.selectedRoles.length > 0) {
      for(let selectedRole of this.selectedRoles) {
        for(let role of this.roles) {
          if(role.id === selectedRole.id) {
            this.roles.splice(this.roles.indexOf(role), 1);
          }
        }
      }
    }
  }

}
