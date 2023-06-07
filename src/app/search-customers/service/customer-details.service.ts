import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerDetailsService {
  constructor(private http: HttpClient) {}

  getCustomerDetails(): Observable<any> {
    const url = 'https://reqres.in/api/users';
    return this.http.get<any>(url);
  }
}
