import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NotFoundComponent } from './not-found/not-found.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DeleteItemComponent } from './delete-item/delete-item.component';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { MaterialModule } from './material/material/material.module';
import { SecNavComponent } from './sec-nav/sec-nav.component';
import { LogoutComponent } from './sec-nav/logout/logout.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { VerifyCodeComponent } from '../admin/work-orders/components/view/verify-code/verify-code.component';
import { NgOtpInputModule, NgOtpInputComponent } from 'ng-otp-input';
import { HoldReasonComponent } from '../admin/work-orders/components/view/hold-reason/hold-reason.component';
import { NotificationsComponent } from './sec-nav/notifications/notifications.component';
import { TimeAgoPipe } from '../services/time-ago.pipe';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    NotFoundComponent,
    NavbarComponent,
    SidebarComponent,
    LogoutComponent,
    DeleteItemComponent,
    NotificationListComponent,
    SecNavComponent,
    ConfirmDialogComponent,
    VerifyCodeComponent,
    HoldReasonComponent,
    NotificationsComponent,
    TimeAgoPipe,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MaterialModule,
    ToastrModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    NgOtpInputComponent,
  ],
  exports: [
    CommonModule,
    SharedRoutingModule,
    MaterialModule,
    ToastrModule,
    ReactiveFormsModule,
    FormsModule,
    NavbarComponent,
    SidebarComponent,
    SecNavComponent,
    TranslateModule,
    NotificationListComponent,
    TimeAgoPipe,
  ],
})
export class SharedModule {}
