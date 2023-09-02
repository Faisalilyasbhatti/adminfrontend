import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Role } from '../../model/role';
import { Data } from '../../../../providers/data';
import { Router, ActivatedRoute } from '@angular/router';
import { RoleService } from '../../service/role.service';
import * as _ from 'underscore';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
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
  selector: 'role-detail',
  templateUrl: './role-detail.html',
  styleUrls: ['./role-detail-component.css'],
  providers:[RoleService]
})

export class RoleDetailComponent implements OnInit,AfterViewInit {
  public isSuccess: boolean = false;
  public isError: boolean = false;
  public mode: string;
  public roles: any;
  public disable: boolean = false;
  public permissions: Role[];
  public roleType:any[];
  public selectedPermission: any[];
  public roleStatus:String;
  public name:String;
  public code:String;
  public createdDate:String;
  public selectedType:any;
  public roleId:number;


  
  constructor(private data: Data ,private route: ActivatedRoute, private router: Router,private roleService: RoleService) { 

    this.route.queryParams.subscribe(params => {

      if(params["mode"] != null) {
          this.mode = params["mode"];
          
          if(this.mode == "Edit") {
						if((this.data.storage != undefined || this.data.storage != null)){
              this.form.controls.Code.disable();
						} else {
							window.location.href="#/role/list";
							return;
						}
          } 
          else if (this.mode == "View"){
						if((this.data.storage != undefined || this.data.storage != null)){
              this.form.disable();
						} else {
							window.location.href="#/role/list";
							return;
						}
          } 
          else {
            return;
          }
          this.roles = this.data.storage.role;
          let userRole=this.data.storage.role.permissionVos;
          this.selectedPermission =_.sortBy(userRole,'code');
          // this.selectedPermission = this.user.roleVos;
          //  this.selectedPermission = _.sortBy(this.selectedPermission, 'code');
        }
      });

  }
  submitted = false;

  form = new FormGroup({
    Name: new FormControl("", [Validators.required,Validators.minLength(3),trimValidator]),
    Code: new FormControl('', [Validators.required,Validators.minLength(3),trimValidator]),
    Status:new FormControl(''),
    RoleType: new FormControl('',Validators.required),
    role: new FormControl('')
   });

   get f() { return this.form.controls; }

  ngOnInit(): void {
    let roleObj=this.roles;
    this.getPermessions();
    this.getRoleType();
    this.roleId=roleObj.id;
    let selected=roleObj.status;
    this.name=roleObj.name;
    this.code=roleObj.code;
    this.createdDate=roleObj.createdDate;
    this.form.get("Name").setValue(this.name);
    this.form.get("Code").setValue(this.code);
    this.form.get("Status").setValue(selected==1?true:false);
    this.form.get("RoleType").setValue(roleObj.roleTypeVo.id);
  }
  
  ngAfterViewInit(){
    setTimeout(()=>{
      $('.chips').chips();
  },500); 
  }

    //add role to selectedPermission
    addRole(role: any) {
      let slctdPer=this.selectedPermission ===undefined ? [] : this.selectedPermission;
      slctdPer.push(role);
      this.selectedPermission = _.sortBy(slctdPer, 'code');
      this.permissions.splice(this.permissions.indexOf(role), 1);
    }

    // remove role from selectedPermission
    removeRole(role: any) {
      this.permissions.push(role);
      this.selectedPermission.splice(this.selectedPermission.indexOf(role), 1);
      this.permissions = _.sortBy(this.permissions, 'code');
    }



    getPermessions() {
      this.roleService.getPermissions().subscribe((result) => {
          if(result != null && result.responseData != null) {
            this.permissions=result.responseData.permissions
              if(this.permissions!=null && this.permissions.length>0){
                this.permissions =  _.sortBy(this.permissions, 'code');
                this.orderSelectedPermissions();
              }
          }
      }, error => {console.log(error)});
    }
    
    getRoleType() {
      this.roleService.getRoleTypes().subscribe((result) => {
          if(result != null && result.responseData != null) {
            let res=result.responseData.roleTypes;
              if(res!=null && res.length>0){
                this.roleType=result.responseData.roleTypes
              }
          }
      }, error => {console.log(error)});
    }

    
  saveRole(role){
    if(this.selectedPermission.length>0)
    this.roleService.saveRole(role).subscribe((result) => {
      if(result != null && result.code === 'EVS_SUCCESS_00') {
        this.isSuccess = true;
      }
      else if(result.code === 'EVS_ERROR_06') {
      this.isError = true;
      }
      else{
        this.isError=true;
        // this.errorMessage();
      }
  }, error => {console.log(error)});
  
  }
    orderSelectedPermissions() {
      if(this.selectedPermission != null && this.selectedPermission.length > 0) {
        for(let selectedPer of this.selectedPermission) {
          for(let role of this.permissions) {
            if(role.code === selectedPer.code) {
              this.permissions.splice(this.permissions.indexOf(role), 1);
            }
          }
        }
      }
    }



    onSubmit(){
      this.submitted = true;
      if (this.form.invalid) {
        return;
    }
    const payload={
      "roleVo": {
          "id": this.roleId === undefined ? null : this.roleId,
          "code": this.form.value.Code === undefined ? this.code : this.form.value.Code,
          "name": this.form.value.Name,
          "permissionVos": this.selectedPermission,
          "roleTypeVo":{id:this.form.value.RoleType},
          "createdBy": null,
          "createdDate":null,
          "updatedBy": null,
          "updatedDate":null,
          "status": this.form.value.Status === true ? 1 : 0
      }
  };
    this.saveRole(payload);
    }

}
