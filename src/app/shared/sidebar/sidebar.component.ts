import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { HelperService } from 'src/app/services/helper.service';


interface Imenu {
  title: string;
  icon: string;
  link: string;
  isActive: boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})



export class SidebarComponent {
  @Output() isOpenedflag = new EventEmitter<boolean>();
  isOpened: boolean = true;

  name: string | null = '';
  email: string | null = '';
  role: string | null = '';
  ngOnInit() {
    this.name = localStorage.getItem('name');
    this.email = localStorage.getItem('email');
    this.role = this._AuthService.title || localStorage.getItem('role');

    // توجيه المستخدم بناءً على الدور
    if (this.isAdmin()) {
      this._Router.navigate(['/dashboard/admin/home']);
    } else if (this.isEngineer()) {
      this._Router.navigate(['/dashboard/engineer/home']);
    } else {
      this._Router.navigate(['/dashboard/technicians/home']);
    }
  }

  constructor(
    public translate: TranslateService,
    public _HelperService: HelperService,
    private _Router: Router,
    private _AuthService: AuthService
  ) { }
  toggleSidebar() {
    this.isOpened = !this.isOpened;
    this.isOpenedflag.emit(this.isOpened);
  }
  isAdmin(): boolean {
    return this._AuthService.title === 'ادمن';
  }

  isEngineer(): boolean {
    return this._AuthService.title === 'Engineer';
  }

  isTechnician(): boolean {
    return (
      this._AuthService.title === 'Technician' ||
      this._AuthService.title === 'Worker'
    );
  }
  menu: Imenu[] = [
    {
      icon: 'fa-regular fa-house fs-4',
      title: this.translate.instant('sidebar.home'),
      link: '/dashboard/admin/home',
      isActive: this.isAdmin(),
    },
    {
      icon: 'fa-regular fa-house fs-4',
      title: this.translate.instant('sidebar.home'),
      link: '/dashboard/engineer/home',
      isActive: this.isEngineer(),
    },
    {
      icon: 'fa-regular fa-house fs-4',
      title: this.translate.instant('sidebar.home'),
      link: '/dashboard/technicians/home',
      isActive: this.isTechnician(),
    },
    {
      icon: 'fa-solid fa-layer-group fs-4',
      title: this.translate.instant('sidebar.workOrders'),
      link: '/dashboard/admin/work-orders',
      isActive: this.isAdmin(),
    },
    {
      icon: 'fa-solid fa-users fs-4',
      title: this.translate.instant('sidebar.users'),
      link: '/dashboard/admin/users',
      isActive: this.isAdmin(),
    },
    {
      icon: 'fa-solid fa-toolbox fs-4',
      title: this.translate.instant('sidebar.devices'),
      link: '/dashboard/admin/devices',
      isActive: this.isAdmin(),
    },
    {
      icon: 'fa-solid fa-toolbox fs-4',
      title: this.translate.instant('sidebar.devices_information'),
      link: '/dashboard/admin/device-data',
      isActive: this.isAdmin(),
    },
    {
      icon: 'fa-solid fa-sitemap fs-4',
      title: this.translate.instant('sidebar.departments'),
      link: '/dashboard/admin/departments',
      isActive: this.isAdmin(),
    },
    {
      icon: 'fa-solid fa-building fs-4',
      title: this.translate.instant('sidebar.building'),
      link: '/dashboard/admin/building',
      isActive: this.isAdmin(),
    },
    {
      icon: 'fa-solid fa-globe fs-4',
      title: this.translate.instant('sidebar.sources'),
      link: '/dashboard/admin/sources',
      isActive: this.isAdmin(),
    },
    {
      icon: 'fa-solid fa-toolbox fs-4',
      title: this.translate.instant('sidebar.equipments'),
      link: '/dashboard/admin/equipments',
      isActive: this.isAdmin(),
    },
    {
      icon: 'fa-solid fa-receipt fs-4',
      title: this.translate.instant('sidebar.reports'),
      link: '/dashboard/admin/reports',
      isActive: this.isAdmin(),
    },

    {
      icon: 'fa-solid fa-layer-group fs-4',
      title: this.translate.instant('sidebar.myorders'),
      link: '/dashboard/engineer/work-orders',
      isActive: this.isEngineer(),
    },
    {
      icon: 'fa-solid fa-toolbox fs-4',
      title: this.translate.instant('sidebar.devices'),
      link: '/dashboard/engineer/devices',
      isActive: this.isEngineer(),
    },
    {
      icon: 'fa-solid fa-house fs-4',
      title: this.translate.instant('sidebar.myorders'),
      link: '/dashboard/technicians/work-orders',
      isActive: this.isTechnician(),
    },
    {
      icon: 'fa-solid fa-toolbox fs-4',
      title: this.translate.instant('sidebar.devices'),
      link: '/dashboard/technicians/devices',
      isActive: this.isEngineer(),
    },
  ];
}
