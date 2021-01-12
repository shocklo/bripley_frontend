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
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  ngOnInit(): void { }

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
        registerFormGroupValue.email
      );
      console.log(registerResult);//TOAST
      this.snackBar.open("Usuario creado exitosamente, favor revisa tu correo electrónico dentro de los próximos minutos para validar tu cuenta.");
      await this.router.navigate(['/', 'auth', 'login']);
    } catch (e) {
      this.snackBar.open(e.error.message);
    } finally {
      this.registerInProgress = false;
    }
  }


  checkRut(rut) {    
    let valor = rut.value.replace('.', '');
    valor = valor.replace('-', '');
    let cuerpo = valor.slice(0, -1);
    let dv = valor.slice(-1).toUpperCase();
    rut.value = cuerpo+dv;
  }





}
