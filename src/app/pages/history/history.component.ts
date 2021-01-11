import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountsService } from '../../shared/services/accounts.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns = ['type_movement', 'from_user', 'to_user', 'ammount'];
  dataSource: MatTableDataSource<any>;

  constructor(private accountsService: AccountsService) {}

  ngOnInit(): void {
    this.accountsService.getLoggedUserHistory().then((res) => {
      this.dataSource = new MatTableDataSource<any>(res.data);
      this.dataSource.paginator = this.paginator;
    });
  }
}
