import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  hide: boolean = true;
  hideConfirm: boolean = true;
  hideRequiredMarker: boolean = true;
  // data: any;
  // ress: any;
  redirectUrl: any;
  preferredCountries: string[] = ['sa', 'eg'];

  constructor(private _AuthService: AuthService,
    private _ToastrService: ToastrService,
    private _Route: Router) { }

  registerForm = new FormGroup({
    user_name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    mobile: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/)
    ]),
    password_confirmation: new FormControl(null, [Validators.required]),
  },
    {
      validators: this.matchPasswords
    })

  matchPasswords(form: any) {
    let password = form.get('password');
    let confirmPassword = form.get('password_confirmation');

    if (password.value == confirmPassword.value) {
      return null
    } else {
      confirmPassword.setErrors({ invalid: 'Password And Confirm Password Not Match' });
      return { invalid: 'Password And Confirm Password Not Match' };
    }
  }

  onSubmit(data: FormGroup) {
    console.log(data.value);
    this._AuthService.onRegister(data.value).subscribe({
      next: (res) => {
        // this.ress = res
        // this.data = res.data
        this._Route.navigate(['/login'])
      },
      error: (err) => {
        this._ToastrService.error(err.error.message, 'Error!');
      },
      complete: () => {
        this._AuthService.getProfile();
        if (localStorage.getItem('redirectUrl')) {
          this.redirectUrl = localStorage.getItem('redirectUrl');
          this._Route.navigate([this.redirectUrl])
        } else {
          this._Route.navigate(['/auth/login'])
        }

      }

    })

  }

}
