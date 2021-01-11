import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private endPoint = `${environment.API_URL}/users`;
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  login = (username, password): Promise<{ success; message; data? }> => {
    const url = `${this.endPoint}/login`;
    return this.http
      .post<{ success; message; data? }>(
        url,
        { username, password },
        { headers: this.httpHeaders }
      )
      .toPromise();
  };

  validate = (user_id, code): Promise<any> => {
    const url = `${this.endPoint}/validate?id_user=${user_id}&code=${code}`;
    return this.http
      .get<any>(url, { headers: this.httpHeaders })
      .toPromise();
  };

  register = (
    username,
    password,
    names,
    last_names,
    gender,
    email
  ): Promise<{ username; password; names; last_names; gender; email }> => {
    const url = `${this.endPoint}`;
    return this.http
      .post<{ username; password; names; last_names; gender; email }>(
        url,
        { username, password, names, last_names, gender, email },
        { headers: this.httpHeaders }
      )
      .toPromise();
  };
}
