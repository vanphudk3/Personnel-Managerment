import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user.model';

const baseUrl = 'http://localhost:3000/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
temp: string | undefined;

constructor(private http: HttpClient) { }

profile(token: any): Observable<any> {
  this.temp = 'profile';
  if (localStorage.getItem('x-access-token')) {
    token = localStorage.getItem('x-access-token');
  }
  return this.http.get(`${baseUrl}/${this.temp}`, { headers: { 'x-access-token': token } }).pipe(
    tap(res => console.log(res))
  );
};

editName(name: any, token: any): Observable<any> {
  if (localStorage.getItem('x-access-token')) {
    token = localStorage.getItem('x-access-token');
  }
  return this.http.put(`${baseUrl}/${this.temp}`,name, { headers: { 'x-access-token': token } });
}

editEmail(email: any, token: any): Observable<any> {
  if (localStorage.getItem('x-access-token')) {
    token = localStorage.getItem('x-access-token');
  }
  return this.http.put(`${baseUrl}/${this.temp}`, email, { headers: { 'x-access-token': token } });
}

editPassword(password: any, token: any): Observable<any> {
  if (localStorage.getItem('x-access-token')) {
    token = localStorage.getItem('x-access-token');
  }
  return this.http.put(`${baseUrl}/${this.temp}`, password, { headers: { 'x-access-token': token } });
}

editPhone(phone: any, token: any): Observable<any> {
  if (localStorage.getItem('x-access-token')) {
    token = localStorage.getItem('x-access-token');
  }
  return this.http.put(`${baseUrl}/${this.temp}`, phone, {headers: { 'x-access-token': token } });
}

checkLogin() {
  if (localStorage.getItem('x-access-token') || localStorage.getItem('admin') || localStorage.getItem('superadmin')) {
    return true;
  }
  return window.location.href = '/#/login';
}

checkToken() {
  this.profile({}).subscribe((res: any) => {
    // res.map((item: any) => {
    //   localStorage.setItem('role_user', item.role);
    // });
      
    // console.log(localStorage.getItem('role_user'));
  }, (err: any) => {
    if (err.error.message === 'Token expired.') {
      localStorage.removeItem('x-access-token');
      localStorage.removeItem('admin');
      localStorage.removeItem('superadmin');
      window.location.href = '/#/login';
    }
  });
}

getUser(id: any, token: any): Observable<any> {
  this.temp = '';
  if (localStorage.getItem('x-access-token')) {
    token = localStorage.getItem('x-access-token');
  }
  return this.http.get(`${baseUrl}/${id}`, { headers: { 'x-access-token': token } });
}

getUsers(page: any,token: any): Observable<any> {
  this.temp = '?page=' + page;
  if (localStorage.getItem('x-access-token')) {
    token = localStorage.getItem('x-access-token');
  }
  return this.http.get(`${baseUrl}/${this.temp}`, { headers: { 'x-access-token': token } });
}

createUser(data: any, token: any): Observable<any> {
  this.temp = '';
  if (localStorage.getItem('x-access-token')) {
    token = localStorage.getItem('x-access-token');
  }
  return this.http.post(`${baseUrl}/${this.temp}`, data, { headers: { 'x-access-token': token } });
}

changeStatus(id: any, status: any, token: any): Observable<any> {
  this.temp = '';
  if (localStorage.getItem('x-access-token')) {
    token = localStorage.getItem('x-access-token');
  }
  return this.http.get(`${baseUrl}/${id}?status=${status}`, { headers: { 'x-access-token': token } });
}

editUser(id: any, data: any, token: any): Observable<any> {
  this.temp = '';
  if (localStorage.getItem('x-access-token')) {
    token = localStorage.getItem('x-access-token');
  }
  return this.http.put(`${baseUrl}/${id}`, data, { headers: { 'x-access-token': token } });
}

deleteUser(id: any, token: any): Observable<any> {
  this.temp = '';
  if (localStorage.getItem('x-access-token')) {
    token = localStorage.getItem('x-access-token');
  }
  return this.http.delete(`${baseUrl}/${id}`, { headers: { 'x-access-token': token } });
}

deleteSelected(ids: any,token: any): Observable<any> {
  this.temp = 'deleteSelected';
  if (localStorage.getItem('x-access-token')) {
    token = localStorage.getItem('x-access-token');
  }
  return this.http.post(`${baseUrl}/${this.temp}`, ids, { headers: { 'x-access-token': token } });
}

getByGroupAndNoDepartment(page: any, token: any): Observable<any> {
  this.temp = 'getByGroupAndNoDepartment';
  if (localStorage.getItem('x-access-token')) {
    token = localStorage.getItem('x-access-token');
  }
  return this.http.get(`${baseUrl}/${this.temp}?page=${page}`, { headers: { 'x-access-token': token } });
}

addDepartmentIntoUser(id: any, userids: any, token: any): Observable<any> {
  this.temp = 'getByGroupAndNoDepartment';
  if (localStorage.getItem('x-access-token')) {
    token = localStorage.getItem('x-access-token');
  }
  return this.http.post(`${baseUrl}/${this.temp}/${id}/addDepartmentSelected`, userids, { headers: { 'x-access-token': token } });
}

getByGroupAndDepartment(page: any, token: any): Observable<any> {
  this.temp = 'getByGroupAndDepartment';
  if (localStorage.getItem('x-access-token')) {
    token = localStorage.getItem('x-access-token');
  }
  return this.http.get(`${baseUrl}/${this.temp}?page=${page}`, { headers: { 'x-access-token': token } });
}

deleteDepartmentIntoUser(userids: any, token: any): Observable<any> {
  this.temp = 'getByGroupAndDepartment';
  if (localStorage.getItem('x-access-token')) {
    token = localStorage.getItem('x-access-token');
  }
  return this.http.post(`${baseUrl}/${this.temp}/deleteDepartmentSelected`,userids, { headers: { 'x-access-token': token } });
}

}
