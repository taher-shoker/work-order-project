import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  notifications: any[] = [];
  isLoading = false;

  constructor(
    private _helpService: HelperService,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.fetchNotifications();
  }

  private fetchNotifications(): void {
    this.isLoading = true;
    this._helpService.getAllNotifications().subscribe({
      next: (res) => {
        this.notifications = [
          {
            id: 1,
            title: 'أمر عمل جديد عاجل',
            message: 'تعطل منظومة الطاولة المحمولة',
            timeAgo: 'قبل 5 دقائق',
            icon: 'assets/icons/work-order.svg',
            urgent: true,
          },
          {
            id: 2,
            title: 'أمر كهرباء عاجل في وحدة العناية المركزة',
            message: 'انقطاع التيار في الوحدة',
            timeAgo: 'قبل 12 دقيقة',
            icon: 'assets/icons/work-order.svg',
            urgent: true,
          },
          {
            id: 3,
            title: 'تحديث حالة أمر عمل',
            message: 'الأمر #102 انتقل إلى مكتمل',
            timeAgo: 'قبل 3 ساعات',
            icon: 'assets/icons/update.svg',
          },
          {
            id: 4,
            title: 'ضبط جديد للإعدادات',
            message: 'انقطاع التيار في الوحدة',
            timeAgo: 'قبل 1 يوم',
            icon: 'assets/icons/settings.svg',
          },
          {
            id: 5,
            title: 'طلب موافقة لإغلاق أمر',
            message: 'الأمر #98 ينتظر الموافقة',
            timeAgo: 'قبل 2 أيام',
            icon: 'assets/icons/request.svg',
          },
        ];
        this.notifications = res.data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  viewDetails(notification: Notification): void {
    console.log('View details:', notification);
  }
}
