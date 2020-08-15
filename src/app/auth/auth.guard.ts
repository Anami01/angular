import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {ApiService} from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private route: Router, private apiService: ApiService) {
  }

  canActivate(): boolean {
    if (this.apiService.loggedIn()) {
      return true;
    } else {
      this.route.navigate(['/']);
      return false;
    }
  }
}
