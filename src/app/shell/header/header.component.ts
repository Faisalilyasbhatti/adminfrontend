
import {Component, OnInit, AfterViewInit} from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router';
import { AuthorizationService } from '../../_services/authorization.service';

@Component({
	moduleId: module.id,
	selector: 'app-header',
	templateUrl: './header.html',
	providers:[]
})

export class HeaderComponent implements OnInit, AfterViewInit{

	public userName:string;
	public lan: string;
	constructor(private router: Router, private authorizationService: AuthorizationService, private route: ActivatedRoute) {
		this.route.queryParams.subscribe(param=>{
		});
	}

	ngOnInit() {
		this.userName = localStorage.getItem('firstName');
	}
	ngAfterViewInit(){
	}
	//logout
  logout() {
    this.authorizationService.logout();
  }
  isPermitted(code: string) {
		return this.authorizationService.hasPermission(code);
	}
}
