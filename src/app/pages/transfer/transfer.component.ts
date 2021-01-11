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

  constructor(
    private AccountsService: AccountsService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {    
    this.transferFormGroup = new FormGroup({
      ammount: new FormControl(null, [Validators.required]),
      id_user_to_transfer: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {}

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


}
