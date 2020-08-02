import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  registerRes: any;

  constructor(private router: Router, private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.get_all_data();
  }

  logout() {
    this.router.navigate(['/']);
  }

  get_all_data() {
    this.apiService.getUsers().subscribe((res) => {
      this.registerRes = res.body;
    });

  }
}
