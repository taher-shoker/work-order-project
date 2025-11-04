import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = localStorage.getItem('token');
    const language = localStorage.getItem('lang')
    const baseUrl: string = 'https://vonnn.net/workorders2/public/api/';

    let newRequest = {
      'Authorization': `Bearer `,
      'Accept-Language': `${language}`
    };
    if (token !== null) {
      newRequest = {
        'Authorization': `Bearer ${token}`,
        'Accept-Language': `${language}`
      }
    }

    let x = request.clone({
      setHeaders: newRequest,
      url: request.url.includes('assets') ? request.url : baseUrl + request.url
    })
    return next.handle(x);
  }
}
