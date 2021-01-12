import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountsService } from '../../shared/services/accounts.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['type_movement', 'from_user', 'to_user', 'ammount'];
  dataSource: MatTableDataSource<any>;
  myAccount = 0;
  constructor(private AccountsService: AccountsService) {

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.AccountsService.getLoggedUserHistory().then((res) => {
      this.dataSource = new MatTableDataSource<any>(res.data);
      this.dataSource.paginator = this.paginator;      
    });
    this.AccountsService.getLoggedUserAcc().then((res) => {
      this.myAccount = res.data.ammount;       
    });

  }
}
