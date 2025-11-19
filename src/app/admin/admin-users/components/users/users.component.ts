import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, Subject } from 'rxjs';
import { UsersService } from 'src/app/admin/services/users.service';
import { BlockUsersComponent } from './block-users/block-users.component';
import { ViewUserComponent } from '../view-user/view-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  tableData: any[] = [];
  tableResponse: any;
  pageSize = 5;
  pageIndex = 0;

  private reloadSubject = new Subject<void>();

  constructor(
    private usersService: UsersService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadUsers();

    this.reloadSubject.pipe(debounceTime(800)).subscribe(() => {
      this.loadUsers();
    });
  }

  /** ✅ Fetch all users with pagination */
  loadUsers(): void {
    const params = {
      page_size: this.pageSize,
      page: this.pageIndex + 1,
    };

    this.spinner.show();
    this.usersService.getAllUsers(params).subscribe({
      next: (res) => {
        this.tableResponse = res;
        this.tableData = res?.data || [];
        this.spinner.hide();
      },
      error: () => {
        this.spinner.hide();
        this.toastr.error('Failed to load users', 'Error');
      },
    });
  }

  /** ✅ Handle pagination change */
  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.loadUsers();
  }

  /** ✅ Open block/unblock user dialog */
  openBlockDialog(user: any): void {
    const dialogRef = this.dialog.open(BlockUsersComponent, { data: user });

    dialogRef.afterClosed().subscribe((userId: number | undefined) => {
      if (userId) {
        this.toggleUserBlock(userId);
      }
    });
  }

  /** ✅ Block or unblock a user */
  private toggleUserBlock(userId: number): void {
    this.usersService.onBlockOrUnblockUser({ user_id: userId }).subscribe({
      next: (res) => {
        const message = res.isActivated
          ? 'User unblocked successfully'
          : 'User blocked successfully';
        this.toastr.success(message, 'Success');
      },
      error: () => {
        this.toastr.error('Failed to block or unblock user', 'Error');
      },
      complete: () => this.loadUsers(),
    });
  }

  /** ✅ Open view user dialog */
  openUserDialog(userId: number): void {
    const dialogRef = this.dialog.open(ViewUserComponent, {
      data: userId,
      width: '60%',
      height: '95%',
    });

    dialogRef.afterClosed().subscribe((updated: boolean) => {
      this.loadUsers();
    });
  }
  
}
