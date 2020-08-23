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
    return this.httpClient.get(`${environment.baseUrl}api/userapi`, {
      observe: 'response'
    }).pipe(tap(res => {
      return res;
    }));
  }

  public updateUser(user: any, id: number) {
    return this.httpClient.put(`${environment.baseUrl}api/userapi/${id}`, user, {
      observe: 'response'
    }).pipe(tap(res => {
      this.notifyService.showSuccess('User data updated successfully', 'Success');
      return res;
    }));
  }

  public getUser(id: number) {
    return this.httpClient.get(`${environment.baseUrl}api/userapi/${id}`, {
      observe: 'response'
    }).pipe(tap(res => {
      return res;
    }));
  }

  public logoutUser() {
    return this.httpClient.post<any>(`${environment.baseUrl}api/logout`, '', {
      observe: 'response'
    }).pipe(tap(res => {
      return res;
    }));
  }

  public deleteUsers(id: number) {
    return this.httpClient.delete<any>(`${environment.baseUrl}api/userapi/${id}`, {
      observe: 'response'
    }).pipe(tap(res => {
      return res;
    }));
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

}
