import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { HelperService } from 'src/app/services/helper.service';
import { LogoutComponent } from './logout/logout.component';
import { DirectionService } from 'src/app/services/direction.service';

@Component({
  selector: 'app-sec-nav',
  templateUrl: './sec-nav.component.html',
  styleUrls: ['./sec-nav.component.scss'],
})
export class SecNavComponent implements OnInit {
  name: string | null = null;
  email: string | null = null;
  role: string | null = null;
  showNotifications = false;
  @ViewChild('notificationButton', { static: false })
  notificationButton!: ElementRef;
  @ViewChild('notificationBox', { static: false }) notificationBox!: ElementRef;
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService,
    public helperService: HelperService,
    public directionService: DirectionService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.name = user.name;
        this.email = user.email;
      }
    });

    this.role = this.authService.title || localStorage.getItem('role');
  }
  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
  }
  /** ✅ Close when clicking anywhere outside bell or box */
  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    const clickedInside =
      this.notificationButton?.nativeElement.contains(target) ||
      this.notificationBox?.nativeElement.contains(target);

    if (!clickedInside) {
      this.showNotifications = false;
    }
  }
  toggleLang(): void {
    const newLang =
      this.helperService.translate.currentLang === 'ar' ? 'en' : 'ar';
    this.helperService.onChangeLang(newLang);
    this.directionService.toggleDirection(newLang === 'ar');
  }

  logOut(): void {
    this.dialog.open(LogoutComponent);
  }
}
