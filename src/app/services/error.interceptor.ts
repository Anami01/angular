import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {NotificationService} from './notification.service';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private notifyService: NotificationService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({headers: request.headers.set('Accept', 'application/json')});
    request = request.clone({headers: request.headers.set('Access-Control-Allow-Origin', '*')});
    // @ts-ignore
    return next.handle(request)
      .pipe(map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            return event;
          }
        },
        (err: any) => {
          let errorMessage;
          if (err instanceof HttpErrorResponse) {
            // client-side error
            errorMessage = `Error: ${err.message}`;
          } else {
            // server-side error
            errorMessage = `Error Code: ${err.status}\nMessage: ${err.message}`;
          }
          // this.notifyService.showError(error.error.error, 'Error');
          this.notifyService.showError(errorMessage, 'Error');
          // return throwError(errorMessage);
        })
      );
  }
}
