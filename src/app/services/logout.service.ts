import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
const baseUrl = 'http://localhost:3000/user/logout';
@Injectable({
  providedIn: 'root'
})
export class LogoutService {

constructor(private http: HttpClient) { }

logout(token: any): any {
  if (localStorage.getItem('x-access-token')) {
    token = localStorage.getItem('x-access-token');
  }
  console.log(token);
  return this.http.post(baseUrl, { headers: { 'x-access-token': token } }).pipe(
    tap(res => console.log(res))
  );
}

}
