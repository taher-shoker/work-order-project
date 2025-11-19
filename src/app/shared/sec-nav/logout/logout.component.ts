import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent {
  constructor(
    public DialogRef: MatDialogRef<LogoutComponent>,
    private _Router: Router,
    // public cookieService: CookieService,
    private _AuthService: AuthService
  ) {}
  onlogOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('title');
    localStorage.removeItem('id');
    localStorage.removeItem('email');
    localStorage.removeItem('redirectUrl');

    this.DialogRef.close();
    this._AuthService.logout();

    this._Router.navigate(['/auth']);
  }
}
