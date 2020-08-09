import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {NotificationService} from './notification.service';
import {LoginModel} from '../auth/login/model/login-model';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  constructor(private httpClient: HttpClient, private notifyService: NotificationService) {
  }

  public createUser(user: any) {
    return this.httpClient.post(`${environment.baseUrl}api/register`, user, {
      observe: 'response'
    }).pipe(tap(res => {
      this.notifyService.showSuccess('User added successfully', 'Success');
      return res;
    }));
  }

  public loginUser(data: LoginModel) {
    return this.httpClient.post(`${environment.baseUrl}api/login`, data, {
      observe: 'response'
    }).pipe(tap(res => {
      this.notifyService.showSuccess('Logged in successfully', 'Success');
      return res.body;
    }));
  }

  public getUsers() {
    return this.httpClient.post(`${environment.baseUrl}api/test`, '', {
      observe: 'response'
    }).pipe(tap(res => {
      return res;
    }));
  }
}
