import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/admin/services/users.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss'],
})
export class ViewUserComponent {
  currentLang = localStorage.getItem('lang');
  // buildingData: any
  userData: any;

  constructor(
    private _UsersService: UsersService,
    private _ToastrService: ToastrService,
    @Optional() public dialogRef?: MatDialogRef<ViewUserComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data?: any
  ) {}

  ngOnInit(): void {
    this.getUserById(this.data);
  }
  getUserById(id: number) {
    this._UsersService.getUser(id).subscribe({
      next: (res) => {
        //    this._ToastrService.success(res.message, 'Get User Succesfuly');
        this.userData = res.data;
        // console.log(this.userData);
      },
      error: (err) => {
        this._ToastrService.error(err.message, 'Error in Fetch user Data');
      },
      complete: () => {},
    });
  }
  onClose(): void {
    this.dialogRef?.close();
  }
}
// import { Component, Inject, OnInit, Optional } from '@angular/core';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { ToastrService } from 'ngx-toastr';
// import { UsersService } from 'src/app/admin/services/users.service';

// @Component({
//   selector: 'app-view-user',
//   templateUrl: './view-user.component.html',
//   styleUrls: ['./view-user.component.scss'],
// })
// export class ViewUserComponent implements OnInit {
//   currentLang: string | null = localStorage.getItem('lang');
//   userData: any;

//   constructor(
//     @Optional() public dialogRef: MatDialogRef<ViewUserComponent>,
//     @Optional() @Inject(MAT_DIALOG_DATA) public userId: any,
//     private usersService: UsersService,
//     private toastr: ToastrService
//   ) {}

//   ngOnInit(): void {
//     this.loadUserData();
//   }

//   /** ✅ Fetch user details by ID */
//   private loadUserData(): void {
//     this.usersService.getUser(this.userId).subscribe({
//       next: (res) => {
//         this.userData = res?.data;
//         // this.toastr.success(
//         //   res?.message || 'User loaded successfully',
//         //   'Success'
//         // );
//       },
//       error: (err) => {
//         const message = err?.message || 'Failed to fetch user data';
//         this.toastr.error(message, 'Error');
//       },
//     });
//   }

//   /** ✅ Close dialog */
//   onClose(): void {
//     this.dialogRef?.close();
//   }
// }
