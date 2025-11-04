import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { HelperService } from 'src/app/services/helper.service';
import { LogoutComponent } from './logout/logout.component';

@Component({
  selector: 'app-sec-nav',
  templateUrl: './sec-nav.component.html',
  styleUrls: ['./sec-nav.component.scss']
})
export class SecNavComponent {
  name: string | null = '';
  email: string | null = '';
  role: string | null = '';
  ngOnInit() {
    this.name = localStorage.getItem('name');
    this.email = localStorage.getItem('email');
    this.role = this._AuthService.title || localStorage.getItem('role');
  }

  constructor(
    private _Router: Router,
    public dialog: MatDialog,
    public _HelperService: HelperService,
    private _AuthService: AuthService

  ) {

  }

  toggleLang() {
    const currentLang = this._HelperService.translate.currentLang;
    const newLang = currentLang === 'ar' ? 'en' : 'ar';
    this.onChangeLang(newLang);
  }

  onChangeLang(lang: string) {
    this._HelperService.onChangeLang(lang);
    window.location.reload();
  }
    logOut() {
    const dialogRef = this.dialog.open(LogoutComponent);
  }
}
