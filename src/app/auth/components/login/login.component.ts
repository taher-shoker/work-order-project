import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide: boolean = true;
  hideRequiredMarker: boolean = true;
  data: any
  ress: any
  redirectUrl: any


  // redirectUrl = localStorage.getItem('redirectUrl');

  constructor(private _AuthService: AuthService,
    private _ToastrService: ToastrService,
    private _Route: Router) { }

  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
    password: new FormControl(null, [
      Validators.required,
      // Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/)
    ]),
  })

  onSubmit(data: FormGroup) {
    console.log(data.value);
    this._AuthService.onLogin(data.value).subscribe({
      next: (res) => {
        this.ress = res
        this.data = res.data
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('id', res.data.id)
        localStorage.setItem('name', this.data.name)
        localStorage.setItem('email', this.data.email)
        localStorage.setItem('title', this.data.title.name)
      },
      error: (err) => {
        this._ToastrService.error(err.error.message, 'Error!');

      },
      complete: () => {
        this._AuthService.getProfile();
        if (localStorage.getItem('redirectUrl')) {
          this.redirectUrl = localStorage.getItem('redirectUrl');
          this._Route.navigate([this.redirectUrl])
        }else{
        this._Route.navigate(['/dashboard'])

        }

        this._ToastrService.success(this.ress.message, `hello ${this.data.name}`)

      }

    })

  }
}
