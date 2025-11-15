import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class DirectionService {
  private isRTL = false;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    this.loadSavedPreference();
  }

  toggleDirection(isRTL?: boolean): void {
    if (isRTL !== undefined) {
      this.isRTL = isRTL;
    } else {
      this.isRTL = !this.isRTL;
    }

    if (isPlatformBrowser(this.platformId)) {
      this.applyDirection(this.isRTL);
      window.location.reload();
    }
  }

  private applyDirection(isRTL: boolean): void {
    // Update document direction
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = isRTL ? 'ar' : 'en';

    // Update Bootstrap stylesheet
    this.updateStylesheet(isRTL);

    // Update body classes
    this.updateBodyClasses(isRTL);

    // Save preference
    this.savePreference(isRTL);
  }

  private updateStylesheet(isRTL: boolean): void {
    const linkId = 'bootstrap-style';
    let link = document.getElementById(linkId) as HTMLLinkElement;

    if (!link) {
      link = document.createElement('link');
      link.id = linkId;
      link.rel = 'stylesheet';
      link.type = 'text/css';
      document.head.appendChild(link);
    }

    const newHref = isRTL
      ? 'assets/bootstrap/bootstrap.rtl.min.css'
      : 'assets/bootstrap/bootstrap.min.css';

    if (!link.href.includes(newHref)) {
      link.href = newHref;
    }
  }

  private updateBodyClasses(isRTL: boolean): void {
    const body = document.body;

    if (isRTL) {
      body.classList.add('rtl-layout');
      body.classList.remove('ltr-layout');
    } else {
      body.classList.add('ltr-layout');
      body.classList.remove('rtl-layout');
    }
  }

  private loadSavedPreference(): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const saved = localStorage.getItem('app-direction');
        if (saved) {
          this.isRTL = saved === 'rtl';
          this.applyDirection(this.isRTL);
        }
      } catch (error) {
        console.warn('Could not load direction preference');
      }
    }
  }

  private savePreference(isRTL: boolean): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem('app-direction', isRTL ? 'rtl' : 'ltr');
      } catch (error) {
        console.warn('Could not save direction preference');
      }
    }
  }

  getCurrentDirection(): boolean {
    return this.isRTL;
  }

  isRTLMode(): boolean {
    return this.isRTL;
  }
}
