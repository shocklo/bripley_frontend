import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../../shared/services/accounts.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss'],
})
export class WithdrawComponent implements OnInit {
  hide = true;
  withdrawFormGroup: FormGroup;
  withdrawProgress = false;
  myAccount = 0;

  constructor(
    private AccountsService: AccountsService,
    private router: Router,
    private snackBar: MatSnackBar

  ) {
    this.withdrawFormGroup = new FormGroup({
      ammount: new FormControl(null, [Validators.required, Validators.min(1)])
    });
   }

  ngOnInit(): void {
    this.AccountsService.getLoggedUserAcc().then((res) => {
      this.myAccount = res.data.ammount;       
    });
   }

  async withdraw(): Promise<any> {    
    if (this.withdrawFormGroup.invalid) {      
      return;
    }
    this.withdrawProgress = true;
    try {
      const loginFormGroupValue = this.withdrawFormGroup.value;
      const depositResult = await this.AccountsService.withdraw(
        loginFormGroupValue.ammount
      );
      await this.router.navigate(['/', 'pages']);
      this.snackBar.open("Saldo retirado exitosamente");
    } catch (e) {
      //console.log(e);
      this.snackBar.open(e.error.message);      
    } finally {
      this.withdrawProgress = false;
    }
  }
}
