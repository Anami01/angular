import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {NotificationService} from './notification.service';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private notifyService: NotificationService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(catchError((error: HttpErrorResponse) => {
          let errorMessage;
          if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
          } else {
            // server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          }
          // this.notifyService.showError(error.error.error, 'Error');
          this.notifyService.showError(errorMessage, 'Error');
          return throwError(errorMessage);
        })
      );
  }
}
