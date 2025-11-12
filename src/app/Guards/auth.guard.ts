// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {
//   constructor(private _router: Router) {

//   }
//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     if (localStorage.getItem('token') !== null) {
//       return true;

//     } else {
//       localStorage.setItem('redirectUrl', state.url)
//       // console.log(state.url);
//       this._router.navigate(['auth'])
//       return false
//     }
//   }

// }

// import { inject } from '@angular/core';
// import { Router, CanActivateFn } from '@angular/router';

// export const authGuard: CanActivateFn = (route, state) => {

//   console.log('🔥 authGuard triggered');
//   const router = inject(Router);
//   const token = localStorage.getItem('token');

//   if (token) {
//       console.log(state.url);
//     return true;
//   }
// else {
//       localStorage.setItem('redirectUrl', state.url)
//       console.log(state.url);
//       router.navigate(['auth'])
//       return false
//     }
// };

// import { inject } from '@angular/core';
// import { Router, UrlSegment, CanMatchFn, Route } from '@angular/router';
// // console.log('🧩 auth.guard.ts LOADED'); // يتحقق لو الملف نفسه انقرأ

// export const authGuard: CanMatchFn  = (route: Route, segments: UrlSegment[]) => {
//   // console.log('🔥 authGuard triggered');

//   const router = inject(Router);
//   const token = localStorage.getItem('token');

//   const attemptedUrl = '/' + segments.map(seg => seg.path).join('/');

//   if (token) {
//     // localStorage.setItem('redirectUrl', attemptedUrl);
//     // console.log('✅ Authorized:', attemptedUrl);
//     return true;
//   } else {
//     console.log('🚫 Not authorized, redirecting to auth. URL:', attemptedUrl);
//     localStorage.setItem('redirectUrl', attemptedUrl);
//     router.navigate(['auth']);
//     return false;
//   }
// };

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(public authService: AuthService, public router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | UrlTree | boolean {
    if (this.authService.isAuthorizedUser() !== true) {
      this.router.navigate(['login']);
    }
    return true;
  }
}
