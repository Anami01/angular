import {Component, OnInit} from '@angular/core';
import {ApiService} from './services/api.service';
import {NotificationService} from './services/notification.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  login: boolean;
  message$: any;


  constructor(private apiService: ApiService,
              private notification: NotificationService,
              private router: Router) {
  }

  ngOnInit(): void {
    const title = 'angular-app';
    this.login = !!this.apiService.loggedIn();
  }

  logout() {
    if (this.apiService.loggedIn()) {
      this.apiService.logoutUser().subscribe((res) => {
        this.notification.showSuccess('Successfully logged out', 'Success');
        this.router.navigate(['/']).then();
        localStorage.removeItem('token');
        this.login = false;
      });
    }
  }
}
