import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { RouteInterceptorService } from './interceptors/route.interceptor';
import { DirectionService } from './services/direction.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'work_orders';

  constructor(
    private translate: TranslateService,
    private router: Router,
    private routeInterceptor: RouteInterceptorService,
    public directionService: DirectionService
  ) {
    this.initLanguage();
  }

  /** Initialize app language */
  private initLanguage(): void {
    const savedLang = localStorage.getItem('lang') || 'ar';
    this.setLanguage(savedLang);
  }

  /** Change app language and persist it */
  setLanguage(lang: string): void {
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }
}
