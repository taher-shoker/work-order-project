import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/admin/services/users.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent {
  currentLang = localStorage.getItem('lang')
  // buildingData: any
  userData :any

  constructor(
    public dialogRef: MatDialogRef<ViewUserComponent>, private _UsersService: UsersService,
    @Inject(MAT_DIALOG_DATA) public data: any, private _ToastrService: ToastrService) { }

  ngOnInit(): void {
    this.getUserById(this.data)
  }
  getUserById(id:number){
      this._UsersService.getUser(id).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message, 'Get User Succesfuly');
        this.userData=res.data
        // console.log(this.userData);
        
      },
      error: (err) => {
        this._ToastrService.error(err.message, 'Error in Fetch user Data');
      },
      complete: () => {
      }
    })
  }
    onClose(): void {
    this.dialogRef.close();
  }
}
