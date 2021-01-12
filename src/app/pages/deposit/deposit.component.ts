import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountsService } from '../../shared/services/accounts.service';
@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss'],
})
export class DepositComponent implements OnInit {
  hide = true;
  depositFormGroup: FormGroup;
  depositProgress = false;
  myAccount = 0;
  ammount: any;
  constructor(
    private AccountsService: AccountsService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.depositFormGroup = new FormGroup({
      ammount: new FormControl(null, [Validators.required, Validators.min(1)])
    });
  }

  ngOnInit(): void {
    this.AccountsService.getLoggedUserAcc().then((res) => {
      this.myAccount = res.data.ammount;       
    });

   }

  async deposit(): Promise<any> {    
    if (this.depositFormGroup.invalid) {      
      return;
    }
    this.depositProgress = true;
    try {
      const loginFormGroupValue = this.depositFormGroup.value;
      const depositResult = await this.AccountsService.deposit(
        loginFormGroupValue.ammount
      );
      await this.router.navigate(['/', 'pages']);
      this.snackBar.open("Saldo cargado exitosamente");
    } catch (e) {
      this.snackBar.open(e.error.message);      
    } finally {
      this.depositProgress = false;
    }
  }
}






