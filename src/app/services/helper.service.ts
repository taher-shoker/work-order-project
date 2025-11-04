import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  textDir: string = 'ltr';
  textPoint: string = 'text-start';
  constructor(private _HttpClient: HttpClient,
    public translate: TranslateService) { 
      translate.onLangChange.subscribe((event: LangChangeEvent) => {
      // do something
      console.log(event.lang);
      if (event.lang === 'en') {
        this.textDir = 'ltr';
        this.textPoint = 'text-start';
      } else {
        this.textPoint = 'text-end me-3';
        this.textDir = 'rtl';
      }
    });
    }
      onChangeLang(lang: string) {
    localStorage.setItem('lang', lang);
    this.translate.use(lang);
    console.log(this.translate.currentLang);

    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
  }
  getCurrentUser(): Observable<any> {
    return this._HttpClient.get('auth/get_single_user');
  }
  getEngineers(id: number): Observable<any> {
    return this._HttpClient.get(`auth/get_engineers/100/${id}`);
  }
  getTechnicians(id: number): Observable<any> {
    return this._HttpClient.get(`auth/get_technicians/100/${id}`);
  }
  getSupervisor(id: number): Observable<any> {
    return this._HttpClient.get(`auth/get_technicians/100/${id}`);
  }

  getNotifications(id: number): Observable<any> {
    return this._HttpClient.get(`notifications/${id}`);
  }

  getAllNotifications(): Observable<any> {
    return this._HttpClient.get(`notifications`);
  }

  MarkAsRead(id: number , data:number): Observable<any> {
    return this._HttpClient.put(`notifications/mark_as_read/${id}`,data);
  }
}
