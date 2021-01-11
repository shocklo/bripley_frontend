import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../shared/services/users.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  loginFormGroup: FormGroup;
  loginInProgress = false;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginFormGroup = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {}

  async login(): Promise<any> {
    if (this.loginFormGroup.invalid) {
      return;
    }
    this.loginInProgress = true;
    try {
      const loginFormGroupValue = this.loginFormGroup.value;
      const loginResult = await this.usersService.login(
        loginFormGroupValue.username,
        loginFormGroupValue.password
      );
      localStorage.setItem('token', loginResult.data);
      await this.router.navigate(['/', 'pages']);
    } catch (e) {
      this.snackBar.open(e.error.message);
    } finally {
      this.loginInProgress = false;
    }
  }
}
