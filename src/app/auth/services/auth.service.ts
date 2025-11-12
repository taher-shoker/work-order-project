import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface IUser {
  id: number;
  name: string;
  email: string;
  mobile: string;
  title: {
    id: number;
    name: string;
  };
  department: {
    id: number;
    name: string;
  };
  is_active: number;
  account_type: number;
  image: string;
  token: string;
  roles: IUserRoles;
}

export interface IUserRoles {
  add_users: boolean;
  edit_users: boolean;
  delete_users: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<IUser | null>(null);
  user$ = this.userSubject.asObservable();
  title: any;
  constructor(
    private _HttpClient: HttpClient,
    private cookieService: CookieService
  ) {
    this.restoreUserFromCookie();
  }

  /** 🔹 Load user from cookie if exists */
  private restoreUserFromCookie(): void {
    try {
      const userStr = this.cookieService.get('user');
      if (userStr) {
        const user: IUser = JSON.parse(userStr);
        this.userSubject.next(user);
      }
    } catch (error) {
      console.error('Failed to parse user cookie:', error);
    }
  }

  /** 🔹 Get current user value */
  get user(): IUser | null {
    return this.userSubject.value;
  }

  /** 🔹 Role Checks */
  isAdmin(): boolean {
    return this.user?.title?.id === 1;
  }

  isEngineer(): boolean {
    return this.user?.title?.id === 2;
  }

  isTechnician(): boolean {
    return this.user?.title?.id === 3;
  }

  /** 🔹 Check if user is authenticated */
  isAuthorizedUser(): boolean {
    return !!this.cookieService.get('token');
  }

  /** 🔹 Login request */
  onLogin(credentials: { email: string; password: string }): Observable<IUser> {
    return this._HttpClient.post<IUser>('auth/login', credentials).pipe(
      tap((res: any) => {
        const user = res?.data;
        if (user) {
          this.userSubject.next(user);
          this.cookieService.set('user', JSON.stringify(user));
          this.cookieService.set('token', user.token);
        }
      })
    );
  }

  /** 🔹 Logout helper */
  logout(): void {
    this.cookieService.delete('user');
    this.cookieService.delete('token');
    this.userSubject.next(null);
  }
}
