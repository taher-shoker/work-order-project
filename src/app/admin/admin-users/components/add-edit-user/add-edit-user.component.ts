import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DevicesService } from 'src/app/admin/devices/services/devices.service';
import { UsersService } from 'src/app/admin/services/users.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

interface Account_type {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss']
})
export class AddEditUserComponent {

  // currentLang = localStorage.getItem('lang');
  // types: Account_type[] = [
  //   { value: 0, viewValue: 'System Admin' },
  //   { value: 1, viewValue: 'Engineer' },
  //   { value: 2, viewValue: 'Technician' },
  // ];
  // departmentId: any;
  // preferredCountries: string[] = ['sa', 'eg'];
  userId: any;
  titles: any;
  currentUser: any;
  department: any;
  userType: any;
  hide: boolean = true;
  hideConfirm: boolean = true;
  hideRequiredMarker: boolean = true;
  isUpdatePage: boolean = false;
  data: any;

  constructor(
    private _activateRoute: ActivatedRoute,
    private _AuthService: AuthService,
    private _UsersService: UsersService,
    private _ToastrService: ToastrService,
    private _Router: Router,
    public _MatDialog: MatDialog,
  ) {
    this.userId = this._activateRoute.snapshot.paramMap.get('id')
    if (this.userId) {
      this.isUpdatePage = true;
    } else {
      this.isUpdatePage = false;
    }
  }

  ngOnInit() {
    this.getCurrentUserById(this.userId);
    this.getTitles();
    this.getDepartments();
  }
  userForm = new FormGroup(
    {
      name: new FormControl(null, [Validators.required,]),
      title_id: new FormControl(null, [Validators.required,]),
      user_name: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-z]{3,10}[0-9]{1,5}$/)]),
      email: new FormControl(null, [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
      mobile: new FormControl(null, [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(13),
      ]),
      account_type: new FormControl(null),
      // department_id: new FormControl(null, [Validators.required,]),
      // profileImage: new FormControl(null),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      password_confirmation: new FormControl(null, [Validators.required])
    },
    {
      validators: this.matchPasswords,
    }
  );

  matchPasswords(form: any) {
    let password = form.get('password');
    let confirmPassword = form.get('password_confirmation');
    if (password.value == confirmPassword.value) {
      return null;
    } else {
      confirmPassword.setErrors({
        invalid: 'Password And Confirm Password Not Match',
      });
      return { invalid: 'Password And Confirm Password Not Match' };
    }
  }



  onSubmit(data: FormGroup) {
    if (this.userId) {
      // Edit Exist User
      // let myData = new FormData();
      // let myMap = new Map(Object.entries(data.value));
      // for (const [key, value] of myMap) {
      //   myData.append(key, data.value[key]);
      // }
      this._UsersService.onEditUser(data.value, this.userId).subscribe({
        next: (res) => {
          console.log(data.value)
          this._ToastrService.success('User Updated Succesfuly');
        },
        error: (err) => {
          this._ToastrService.error(err.message, 'Error in Update User');
        },
        complete: () => {
          this._Router.navigate(['/dashboard/users']);
        }
      })

    } else {
      // Add new User
      // let myData = new FormData();
      // let myMap = new Map(Object.entries(data.value));
      // for (const [key, value] of myMap) {
      //   myData.append(key, data.value[key]);
      // }
      this._AuthService.onRegister(data.value).subscribe({
        next: (res) => {
          this.data = res;
          console.log(res);
          this._ToastrService.success(res.data.email, 'Check yor Email to Verify');
        },
        error: (err) => {
          console.log(err);
          this._ToastrService.error(err.message, 'Error in Adding a new user to the system');
        },
        complete: () => {
          this._Router.navigate(['/dashboard/users']);
        }
      });
    }
  }

  getCurrentUserById(id: number) {
    this._UsersService.getUser(id).subscribe(
      (res) => {
        this.currentUser = res.data
        this.userType = this.currentUser.account_type
        this.titles = this.currentUser.title
        this.department = this.currentUser.department
        
        console.log(this.currentUser);

        this.userForm.patchValue({
          name: this.currentUser?.name,
          title_id: this.titles?.id,
          email: this.currentUser?.email,
          account_type: this.userType,
          user_name: this.currentUser?.user_name,
          mobile: this.currentUser?.mobile,
          password: this.currentUser?.password,
          password_confirmation: this.currentUser?.password_confirmation,
          // department_id: this.department?.id,
        })

      })
  }

  getTitles() {
    this._UsersService.onGetAccountType().subscribe(
      (res) => {
        this.titles = res.data;
        console.log(this.titles);
      }
    )
  }
  getDepartments() {
    this._UsersService.onGetDepartment().subscribe(
      (res) => {
        this.department = res.data;
        console.log(this.department);
      }
    )
  }

}
