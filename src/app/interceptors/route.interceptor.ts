import { Injectable } from '@angular/core';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
  Event,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RouteInterceptorService {
  private lastAttemptedUrl: string | null = null;

  constructor(private router: Router) {
    this.trackRoutes();
  }

  private trackRoutes(): void {
    // this.router.events.subscribe((event: Event) => {
    //   if (event instanceof NavigationStart) {
    //     // 🔹 بداية محاولة تنقل
    //     this.lastAttemptedUrl = event.url;
    //     localStorage.setItem('attemptedUrl', this.lastAttemptedUrl);
    //     console.log('🔹 محاولة الانتقال إلى:', event.url);
    //   }
    //   if (event instanceof NavigationEnd) {
    //     // ✅ تم التنقل بنجاح
    //     localStorage.setItem('lastSuccessfulUrl', event.urlAfterRedirects);
    //     console.log('✅ تم الوصول إلى:', event.urlAfterRedirects);
    //   }
    //   if (event instanceof NavigationCancel || event instanceof NavigationError) {
    //     console.warn('❌ تم إلغاء أو فشل التنقل إلى:', this.lastAttemptedUrl);
    //   }
    // });
  }
}
