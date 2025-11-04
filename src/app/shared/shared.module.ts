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
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MaterialModule,
    ToastrModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule

  ],
  exports:[
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
    NotificationListComponent

  ]
})
export class SharedModule { }
