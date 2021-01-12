import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  private endPoint = `${environment.API_URL}/accounts`;
  private endPointDeposit = `${environment.API_URL}/accounts/doDeposit`;
  private endPointWithdraw = `${environment.API_URL}/accounts/doWithdraw`;
  private endPointTransfer = `${environment.API_URL}/accounts/transfer`;
  private endPointMyAcc = `${environment.API_URL}/accounts/myAccount`;
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getLoggedUserHistory = (): Promise<any> => {
    const url = `${this.endPoint}`;
    return this.http
      .get<any>(url, { headers: this.httpHeaders })
      .toPromise();
  };

  deposit = (
    ammount: any
  ): Promise<{ ammount; }> => {
    const url = `${this.endPointDeposit}`;
    return this.http
      .post<{ ammount; }>(
        url,
        { ammount },
        { headers: this.httpHeaders }
      )
      .toPromise();
  };

  withdraw = (
    ammount: any
  ): Promise<{ ammount; }> => {
    const url = `${this.endPointWithdraw}`;
    return this.http
      .post<{ ammount; }>(
        url,
        { ammount },
        { headers: this.httpHeaders }
      )
      .toPromise();
  };

  transfer = (
    ammount: any,
    id_user_to_transfer: any,
  ): Promise<{ ammount; id_user_to_transfer; }> => {
    const url = `${this.endPointTransfer}`;
    return this.http
      .post<{ ammount; id_user_to_transfer; }>(
        url,
        { ammount, id_user_to_transfer },
        { headers: this.httpHeaders }
      )
      .toPromise();
  };

  getLoggedUserAcc = (): Promise<any> => {
    const url = `${this.endPointMyAcc}`;
    return this.http
      .get<any>(url, { headers: this.httpHeaders })
      .toPromise();
  };

  



}



