import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../shared/services/users.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerInProgress = false;
  registerFormGroup: FormGroup;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registerFormGroup = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      names: new FormControl(null, [Validators.required]),
      last_names: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {}

  async register(): Promise<any> {
    if (this.registerFormGroup.invalid) {
      return;
    }
    this.registerInProgress = true;
    try {
      const registerFormGroupValue = this.registerFormGroup.value;
      const registerResult = await this.usersService.register(
        registerFormGroupValue.username,
        registerFormGroupValue.password,
        registerFormGroupValue.names,
        registerFormGroupValue.last_names,
        registerFormGroupValue.gender,
        registerFormGroupValue.email
      );
      console.log(registerResult);
      await this.router.navigate(['/', 'auth', 'login']);
    } catch (e) {
      this.snackBar.open(e.error.message);
    } finally {
      this.registerInProgress = false;
    }
  }
}
