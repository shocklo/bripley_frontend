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

  checkRut(rut) {    
    let valor = rut.value.replace('.', '');
    valor = valor.replace('-', '');
    let cuerpo = valor.slice(0, -1);
    let dv = valor.slice(-1).toUpperCase();
    rut.value = cuerpo + '-' + dv;
    if (cuerpo.length < 7) {
       rut.setCustomValidity("RUT Incompleto"); return false; 
    }
    let suma = 0;
    let multiplo = 2;
    for (let i = 1; i <= cuerpo.length; i++) {
      let index = multiplo * valor.charAt(cuerpo.length - i);
      suma = suma + index;
      if (multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }
    }
    let dvEsperado = 11 - (suma % 11);
    dv = (dv == 'K') ? 10 : dv;
    dv = (dv == 0) ? 11 : dv;
    if (dvEsperado != dv) {
       rut.setCustomValidity("RUT Inválido"); return false;
    }   
    return true;
  }
}
