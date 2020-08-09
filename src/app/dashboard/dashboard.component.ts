import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../services/api.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  registerRes: any;
  token: string;
  cookie: string;

  constructor(private router: Router,
              private apiService: ApiService,
              private cookieService: CookieService) {
  }

  ngOnInit(): void {
    this.cookie = this.cookieService.get('token');
    // this.token = localStorage.getItem('token');
    if (this.cookie === null || this.cookie === '') {
      this.logout();
    }
    this.get_all_data();
  }

  logout() {
    this.router.navigate(['/']).then();
    this.cookieService.delete('token');
    this.cookieService.deleteAll();
  }

  get_all_data() {
    this.apiService.getUsers().subscribe((res) => {
      this.registerRes = res.body;
    });

  }
}
