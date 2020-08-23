import {Component, OnInit} from '@angular/core';
import {ApiService} from './services/api.service';
import {NotificationService} from './services/notification.service';
import {Router} from '@angular/router';
import {LoginModel} from './auth/login/model/login-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  login: LoginModel;
  message$: any;

  constructor(private apiService: ApiService,
              private notification: NotificationService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.login = new LoginModel();
    this.login.isLoggedin = !!this.apiService.loggedIn();
  }

  logout() {
    if (this.apiService.loggedIn()) {
      this.apiService.logoutUser().subscribe(() => {
        this.notification.showSuccess('Successfully logged out', 'Success');
        this.router.navigate(['/']).then();
        localStorage.removeItem('token');
        this.login.isLoggedin = false;
      });
    }
  }

  dashboard() {
    this.router.navigate(['dashboard']).then();
  }
}
