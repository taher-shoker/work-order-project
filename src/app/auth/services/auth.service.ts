import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  title: any


  constructor(private _HttpClient: HttpClient) {
    if (localStorage.getItem('token') !== null) {
      // console.log(localStorage.getItem('token'))
      this.getProfile()
    }
  }


  getProfile() {
    localStorage.getItem('title')
    this.getRole()
  }

  getRole() {
    if (
      localStorage.getItem('token') !== null &&
      localStorage.getItem('title')
    ) {
      this.title = localStorage.getItem('title');
    }
  }
  onLogin(data: any): Observable<any> {
    return this._HttpClient.post('auth/login', data);
  }
}
