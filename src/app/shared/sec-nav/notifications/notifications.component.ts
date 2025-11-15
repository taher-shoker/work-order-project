import { Component, HostListener, OnInit } from '@angular/core';

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
  currentPage: number = 1;
  lastPage: number = 1;
  isLoading: boolean = false;
  isFetchingMore: boolean = false;

  constructor(
    private _helpService: HelperService,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.fetchNotifications(1);
  }

  private fetchNotifications(page: number = 1): void {
    if (this.isFetchingMore) return;

    this.isFetchingMore = true;

    this._helpService.getAllNotifications(page).subscribe({
      next: (res) => {
        if (page === 1) {
          // first load
          this.notifications = res.data.data;
        } else {
          // append new items
          this.notifications = [...this.notifications, ...res.data.data];
        }

        this.currentPage = res.data.current_page;
        this.lastPage = res.data.last_page;

        this.isFetchingMore = false;
      },
      error: () => {
        this.isFetchingMore = false;
      },
    });
  }
  @HostListener('window:scroll', [])
  onScroll(): void {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 200
    ) {
      this.loadNextPage();
    }
  }
  loadNextPage() {
    if (this.currentPage < this.lastPage && !this.isFetchingMore) {
      this.fetchNotifications(this.currentPage + 1);
    }
  }

  viewDetails(notification: Notification): void {
    console.log('View details:', notification);
  }
}
