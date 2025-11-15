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
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Output() isOpenedflag = new EventEmitter<boolean>();
  isOpened: boolean = true;

  name: string = '';
  email: string = '';
  roleId!: number;

  constructor(
    public translate: TranslateService,
    public _HelperService: HelperService,
    private _Router: Router,
    public _AuthService: AuthService
  ) {}
  ngOnInit() {
    this.roleId = this._AuthService.title || localStorage.getItem('role');

    this._AuthService.user$.subscribe((user) => {
      if (user) {
        this.name = user?.name;
        this.email = user?.email;
        this.roleId = user.title.id;
      }
    });
  }

  getLabel(statusId: number): string {
    const statusLabels: Record<number, string> = {
      1: 'admin',
      2: 'engineer',
      3: 'technicianer',
    };

    return statusLabels[statusId] || 'status.unknown';
  }

  toggleSidebar() {
    this.isOpened = !this.isOpened;
    this.isOpenedflag.emit(this.isOpened);
  }

  menu: Imenu[] = [
    // ===== Common Home =====
    {
      icon: 'fa-regular fa-house fs-4',
      title: 'sidebar.home',
      link: '/dashboard/home',
      isActive: this._AuthService.isAdmin(),
    },
    {
      icon: 'fa-regular fa-house fs-4',
      title: 'sidebar.home',
      link: '/dashboard/home',
      isActive: this._AuthService.isEngineer(),
    },
    {
      icon: 'fa-regular fa-house fs-4',
      title: 'sidebar.home',
      link: '/dashboard/home',
      isActive: this._AuthService.isTechnician(),
    },

    // ===== Admin Section =====
    {
      icon: 'fa-solid fa-layer-group fs-4',
      title: 'sidebar.workOrders',
      link: '/dashboard/work-orders',
      isActive: this._AuthService.isAdmin(),
    },
    {
      icon: 'fa-solid fa-users fs-4',
      title: 'sidebar.users',
      link: '/dashboard/users',
      isActive: this._AuthService.isAdmin(),
    },
    {
      icon: 'fa-solid fa-toolbox fs-4',
      title: 'sidebar.devices',
      link: '/dashboard/devices',
      isActive: this._AuthService.isAdmin(),
    },
    {
      icon: 'fa-solid fa-toolbox fs-4',
      title: 'sidebar.devices_information',
      link: '/dashboard/device-data',
      isActive: this._AuthService.isAdmin(),
    },
    {
      icon: 'fa-solid fa-sitemap fs-4',
      title: 'sidebar.departments',
      link: '/dashboard/departments',
      isActive: this._AuthService.isAdmin(),
    },
    {
      icon: 'fa-solid fa-building fs-4',
      title: 'sidebar.building',
      link: '/dashboard/building',
      isActive: this._AuthService.isAdmin(),
    },
    {
      icon: 'fa-solid fa-globe fs-4',
      title: 'sidebar.sources',
      link: '/dashboard/sources',
      isActive: this._AuthService.isAdmin(),
    },
    {
      icon: 'fa-solid fa-toolbox fs-4',
      title: 'sidebar.equipments',
      link: '/dashboard/equipments',
      isActive: this._AuthService.isAdmin(),
    },
    {
      icon: 'fa-solid fa-receipt fs-4',
      title: 'sidebar.reports',
      link: '/dashboard/reports',
      isActive: this._AuthService.isAdmin(),
    },

    // ===== Engineer Section =====
    {
      icon: 'fa-solid fa-layer-group fs-4',
      title: 'sidebar.myorders',
      link: '/dashboard/work-orders',
      isActive: this._AuthService.isEngineer(),
    },
    {
      icon: 'fa-solid fa-toolbox fs-4',
      title: 'sidebar.devices',
      link: '/dashboard/devices',
      isActive: this._AuthService.isEngineer(),
    },

    // ===== Technician Section =====
    {
      icon: 'fa-solid fa-layer-group fs-4',
      title: 'sidebar.myorders',
      link: '/dashboard/work-orders',
      isActive: this._AuthService.isTechnician(),
    },
    {
      icon: 'fa-solid fa-toolbox fs-4',
      title: 'sidebar.devices',
      link: '/dashboard/devices',
      isActive: this._AuthService.isTechnician(),
    },
  ];
}
