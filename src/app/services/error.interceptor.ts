import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {NotificationService} from './notification.service';
import {Injectable, Injector} from '@angular/core';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})

export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private notifyService: NotificationService, private inject: Injector) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authComp = this.inject.get(ApiService);
    const req = request.clone({
      setHeaders: {
        Authorization: `Bearer ${authComp.getToken()}`,
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    });
    // @ts-ignore
    return next.handle(req)
      .pipe(tap(event => {
          if (event instanceof HttpResponse) {
            return event;
          }
        },
        err => {
          let message = '';
          if (err.status === '401') {
            message = 'You are not authorised to view this page';
          } else {
            message = 'Error connecting to server';
          }
          this.notifyService.showError(message, 'Error');
          return err.status;
        }
      ));
  }
}
