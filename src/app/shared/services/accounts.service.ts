import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  private endPoint = `${environment.API_URL}/accounts`;
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  getLoggedUserHistory = (): Promise<any> => {
    const url = `${this.endPoint}`;
    return this.http
      .get<any>(url, { headers: this.httpHeaders })
      .toPromise();
  };
}
