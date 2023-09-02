import { ExcelService } from './../../../../file-saver/excel.service';
import { Component, OnInit, AfterViewInit} from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { User } from '../../model/user';
import { Role } from '../../../role/model/role';
import { UserService } from '../../service/user.service';
import { Data } from '../../../../providers/data';
import { LoginComponent } from '../../../../auth/login/component/login.component';
import { PagerService } from '../../../../_services/index';
declare var $: any;
import * as _ from 'underscore';

@Component({
  // moduleId: module.id,
  selector: 'user-list',
  templateUrl: './userList.html',
  providers:[UserService]
})
export class UserListComponent implements OnInit, AfterViewInit {

  public users: User[] = new Array<User>();
  public _users: User[] = new Array<User>();
  pager: any = {};
  pagedItems: any[];
  public user : User;
  public isSuccess: boolean = false;
  public disable: boolean = false;
  public resetPasswordMessage : string;
  public resetPassError: boolean = false;
  public  confirmPassword : string;
  public page: number = 0;
  public searchModel = {
    firstName: '',
    lastName: '',
    email: '',
    status: '-1'
  };
  public deleteFlag: boolean = false;

  constructor(private userService: UserService, private pagerService: PagerService, private router: Router, private data: Data, private loginComponent: LoginComponent, private excelService: ExcelService) {}

  ngOnInit() {
    // this.user = new User();
    this.getUsers();
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

  getUsers() {
    this.userService.getUsers().subscribe((result)=> {
      if(result != null && result.responseData != null) {
        this.users = result.responseData.users;
        this._users = result.responseData.users;
        if(this.users === null) {
          this.users = new Array();
          this._users = new Array();
        }
        if(this.data.storage === null || this.data.storage === undefined){
          this.setPage(1);
        }
        else if(this.data.storage.page === null || this.data.storage.page === undefined){
          this.setPage(1);
        }
        // else {
          // this.setPage(this.data.storage.page);
        // }
      }
    }, error => {console.log(error);})
  }

  setPage(page: number) {
    if (page < 1 || page > this.users.length) {
      return;
    }
      this.pager = this.pagerService.getPager(this.users.length, page, 10);
      this.pagedItems = this.users.slice(this.pager.startIndex, this.pager.endIndex + 1);
       this.page = page;
  }

  viewUserDetail(user: any) {
    let navigationExtras: NavigationExtras = {
				queryParams : {
          "mode": "View",
				}
			}
			this.data.storage = {
        user: user,
        page: this.page
      };
			this.router.navigate(['user','detail'], navigationExtras);
  }

  editUserDetail(user: any) {
    let navigationExtras: NavigationExtras = {
				queryParams : {
					"mode": "Edit"
				}
			}
			this.data.storage = {
        user: user,
        page: this.page
      };
			this.router.navigate(['user','detail'], navigationExtras);
  }

  createNewUser() {
    let navigationExtras: NavigationExtras = {
				queryParams : {
					"mode": "Add"
				}
			}
			this.router.navigate(['user','detail'], navigationExtras);
  }

  exportExcel()
  {
    
  }

}
