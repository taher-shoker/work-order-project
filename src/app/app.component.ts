import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { RouteInterceptorService } from './interceptors/route.interceptor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  langu = localStorage.getItem('lang');

constructor(public translate: TranslateService , public router:Router , private routeInterceptor: RouteInterceptorService) {
  // const defaultLang = 'en';
  if (localStorage.getItem('lang') == null) {
    this.onChangeLang('ar')

  }
  this.onChangeLang('ar')

}

onChangeLang(lang: any) {
  this.translate.setDefaultLang(lang)
  this.translate.use(lang)
  localStorage.setItem('lang', lang)


}

  // @HostListener('window:beforeunload', ['$event'])
  // onBeforeUnload(event: Event) {
  //   console.log('🔁 الصفحة بتعمل reload!');
  //   // مثال: حفظ حالة المستخدم أو تنظيف بيانات
  //   localStorage.setItem('reloaded', 'true');
  // }

title = 'work_orders';
}
