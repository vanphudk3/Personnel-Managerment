import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user.model';

const baseUrl = 'http://localhost:3000/user/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

constructor(private http: HttpClient) { }

login(data: any): Observable<any> {
  return this.http.post(baseUrl, data).pipe(
    tap(res => console.log(res))
  );
}

checkLogin() {
  if (localStorage.getItem('x-access-token') || localStorage.getItem('admin') || localStorage.getItem('superadmin')) {
    console.log('true');
    return true;
  }
  return false;
}

}
