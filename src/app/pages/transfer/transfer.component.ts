import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountsService } from '../../shared/services/accounts.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss'],
})
export class TransferComponent implements OnInit {
  hide = true;
  transferFormGroup: FormGroup;
  depositProgress = false;
  myAccount = 0;
  constructor(
    private AccountsService: AccountsService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {    
    this.transferFormGroup = new FormGroup({
      ammount: new FormControl(null, [Validators.required,  Validators.min(1)]),
      id_user_to_transfer: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.AccountsService.getLoggedUserAcc().then((res) => {
      this.myAccount = res.data.ammount;       
    });
  }

  async transfer(): Promise<any> {    
    if (this.transferFormGroup.invalid) {      
      return;
    }
    this.depositProgress = true;
    try {
      const loginFormGroupValue = this.transferFormGroup.value;
      const depositResult = await this.AccountsService.transfer(
        loginFormGroupValue.ammount, loginFormGroupValue.id_user_to_transfer
      );
      await this.router.navigate(['/', 'pages']);
      this.snackBar.open("Saldo transferido exitosamente");
    } catch (e) {
      this.snackBar.open(e.error.message);      
    } finally {
      this.depositProgress = false;
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
