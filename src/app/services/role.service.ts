import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
const baseUrl = 'http://localhost:3000/role';
@Injectable({
  providedIn: 'root'
})
export class RoleService {
temp: any;
constructor(private http: HttpClient) { }

getRoles(token: any): Observable<any> {
  if (localStorage.getItem('x-access-token')) {
    token = localStorage.getItem('x-access-token');
  }
  return this.http.get(baseUrl, { headers: { 'x-access-token': token } }).pipe(
    tap(res => console.log(res))
  );
}

getRoleExSuperAdmin(token: any): Observable<any> {
  this.temp = '/get/exsuperadmin';
  if (localStorage.getItem('x-access-token')) {
    token = localStorage.getItem('x-access-token');
  }
  return this.http.get(`${baseUrl}/${this.temp}`, { headers: { 'x-access-token': token } }).pipe(
    tap(res => console.log(res))
  );
}

}
