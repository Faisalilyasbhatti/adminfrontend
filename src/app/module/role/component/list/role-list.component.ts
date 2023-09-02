import { Component, OnInit, AfterViewInit} from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Role } from '../../model/role';
import { RoleService } from '../../service/role.service';
import { Data } from '../../../../providers/data';
import { LoginComponent } from '../../../../auth/login/component/login.component';
import { PagerService } from '../../../../_services/index';
declare var $: any;

@Component({
  moduleId: module.id,
  selector: 'role-list',
  templateUrl: './roleList.html',
  providers:[RoleService]
})
export class RoleListComponent implements OnInit, AfterViewInit {

  public roles: Role[] = new Array<Role>();
  pager: any = {};
  pagedItems: any[];
  public role : Role;

  public page: number = 0;
  public deleteFlag: boolean = false;

  constructor(private roleService: RoleService, private pagerService: PagerService, private router: Router, private data: Data, private loginComponent: LoginComponent) {}

  ngOnInit() {
    this.getRoles();
  }
  ngAfterViewInit() {
      setTimeout(()=>{
        $("#data-table-simple").DataTable({
          responsive: !0,
          bLengthMenu:false,
          searching:false,
          language:false,
          bLengthChange: false});
    },500);
  }

  // list all roles by logined user email
  getRoles() {
    // sessionStorage.getItem("userEmailAdmin")
    this.roleService.getRoles().subscribe((res)=> {
      let result = res.responseData;
      if(res != null && res.responseData != null) {
        this.roles = res.responseData.roles;
        if(this.roles === null) {
          this.roles = new Array();
        }
        this.setPage(1);
      }
    }, error => {console.log(error);})
  }



  editUserDetail(role: any) {
    let navigationExtras: NavigationExtras = {
				queryParams : {
					"mode": "Edit"
				}
			}
			this.data.storage = {
        role: role,
        page: this.page
      };
			this.router.navigate(['role','detail'], navigationExtras);
  }

  createNewUser() {
    let navigationExtras: NavigationExtras = {
				queryParams : {
					"mode": "Add"
				}
			}
			this.router.navigate(['role','detail'], navigationExtras);
  }

  viewUserDetail(role: any) {
    let navigationExtras: NavigationExtras = {
				queryParams : {
          "mode": "View",
				}
			}
			this.data.storage = {
        role: role,
        page: this.page
      };
			this.router.navigate(['role','detail'] ,navigationExtras);
  }

  deleteUserModalShow(role: any){
    this.role = role;
    console.log(role);

    $("#delete-user-modal").modal({
      backdrop: 'static',
      keyboard: false
    });
    $("#successDeleteUser").hide();
    $("#deleteBtn").show();
  }

  deleteUser(){
    let rId=this.role.id;
    $("#deleteBtn").hide();
    $("#delete-user-modal").hide();
    this.roleService.deleteRole(rId).subscribe((res)=> {
      this.goBackAfterDelete();
      let result = res.responseData;
      if(res != null && res.responseData != null) {
        // this.roles = res.responseData.roles;
        // if(this.roles === null) {
        //   this.roles = new Array();
        // }
        this.setPage(1);
      }
    }, error => {console.log(error);
    })
  }


  createRole(){
    let navigationExtras: NavigationExtras = {
      queryParams : {
        "mode": "Add",
      }
    }
    this.router.navigate(['role','detail'] ,navigationExtras);
  }


  setPage(page: number) {
      if (page < 1 || page > this.pager.totalPages) {
        return;
      }
      this.pager = this.pagerService.getPager(this.roles.length, page, 10);
      this.pagedItems = this.roles.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }


  goBackAfterDelete(){
    if(this.deleteFlag){
      this.deleteFlag = false;
      window.location.reload();
    }}

    exportExcel()
    {
      
    }

}
