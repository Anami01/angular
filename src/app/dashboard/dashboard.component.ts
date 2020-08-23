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
  token: string;
  cookie: string;

  constructor(private router: Router,
              private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.get_all_data();
  }

  get_all_data() {
    this.apiService.getUsers().subscribe((res) => {
      this.registerRes = res.body;
    });
  }

  edit(id: number) {
    // @ts-ignore
    this.router.navigate([`/dashboard/edit_user/${id}`]).then();
  }

  delete(id: any) {
    this.apiService.deleteUsers(id).subscribe(() => {
      this.get_all_data();
    });
  }
}
