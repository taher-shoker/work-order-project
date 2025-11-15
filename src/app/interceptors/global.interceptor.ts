// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor,
// } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable()
// export class GlobalInterceptor implements HttpInterceptor {
//   constructor() {}

//   intercept(
//     request: HttpRequest<unknown>,
//     next: HttpHandler
//   ): Observable<HttpEvent<unknown>> {
//     const token = localStorage.getItem('token');
//     const language = localStorage.getItem('lang');
//     const baseUrl = 'https://vonnn.net/workorders2/public/api/';

//     let headers: any = {
//       'Accept-Language': language || 'ar',
//     };

//     if (token) {
//       headers['Authorization'] = `Bearer ${token}`;
//     }

//     const newReq = request.clone({
//       setHeaders: headers,
//       url: request.url.includes('assets') ? request.url : baseUrl + request.url,
//     });

//     return next.handle(newReq);
//   }

// }

import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {
  constructor(private cookieService: CookieService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.cookieService.get('token'); // ← هنا نقرأ التوكن من الكوكيز
    const language = localStorage.getItem('lang');

    const baseUrl = 'https://vonnn.net/workorders2/public/api/';

    let headers: any = {
      'Accept-Language': language,
    };

    // لو فيه توكن من الكوكيز، أضفه
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const newReq = request.clone({
      setHeaders: headers,
      url: request.url.includes('assets') ? request.url : baseUrl + request.url,
    });

    return next.handle(newReq);
  }
}
