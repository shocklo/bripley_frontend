import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { ThemeModule } from '../theme/theme.module';
import { TransferComponent } from './transfer/transfer.component';
import { DepositComponent } from './deposit/deposit.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { HistoryComponent } from './history/history.component';

@NgModule({
  declarations: [
    PagesComponent,
    TransferComponent,
    DepositComponent,
    WithdrawComponent,
    HistoryComponent,
  ],
  imports: [CommonModule, PagesRoutingModule, ThemeModule],
})
export class PagesModule {}
