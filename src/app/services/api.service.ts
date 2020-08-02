import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from './user';
import {tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {NotificationService} from './notification.service';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  constructor(private httpClient: HttpClient, private notifyService: NotificationService) {
  }

  public createUser(user: any) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Access-Control-Allow-Origin', '*');
    return this.httpClient.post<User[]>(`${environment.baseUrl}api/register`, user, {
      headers,
      observe: 'response'
    }).pipe(tap(res => {
      this.notifyService.showSuccess('User added successfully', 'Success');
      return res;
    }));
  }

  public loginUser(email: any, password: any) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Access-Control-Allow-Origin', '*');
    return this.httpClient.post<User[]>(`${environment.baseUrl}api/login`, {email, password}, {
      headers,
      observe: 'response'
    }).pipe(tap(res => {
      this.notifyService.showSuccess('Logged in successfully', 'Success');
      return res;
    }));
  }

  public getUsers() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Access-Control-Allow-Origin', '*');

    return this.httpClient.post<User[]>(`${environment.baseUrl}api/test`, '', {
      headers,
      observe: 'response'
    }).pipe(tap(res => {
      return res;
    }));
  }
}
