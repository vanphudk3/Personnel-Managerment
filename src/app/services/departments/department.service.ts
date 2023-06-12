import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
const baseUrl = 'http://localhost:3000/department';
@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
temp: any;
constructor(private http: HttpClient) { }

getAll(page: any, token: any): Observable<any> {
  if (localStorage.getItem('x-access-token')) {
    token = localStorage.getItem('x-access-token');
  }
  return this.http.get(`${baseUrl}?page=${page}`, { headers: { 'x-access-token': token } });
}

getDepartmentNotPaginate(token: any): Observable<any> {
  this.temp = 'getDepartment';
  if (localStorage.getItem('x-access-token')) {
    token = localStorage.getItem('x-access-token');
  }
  return this.http.get(`${baseUrl}/getDepartment`, { headers: { 'x-access-token': token } });
}

getById(id: any, token: any): Observable<any> {
  if (localStorage.getItem('x-access-token')) {
    token = localStorage.getItem('x-access-token');
  }
  return this.http.get(`${baseUrl}/${id}`, { headers: { 'x-access-token': token } });
}

editDepartment(id: any, data: any, token: any): Observable<any> {
  if (localStorage.getItem('x-access-token')) {
    token = localStorage.getItem('x-access-token');
  }
  return this.http.put(`${baseUrl}/${id}`, data, { headers: { 'x-access-token': token } });
}

createDepartment(data: any, token: any): Observable<any> {
  if (localStorage.getItem('x-access-token')) {
    token = localStorage.getItem('x-access-token');
  }
  return this.http.post(baseUrl, data, { headers: { 'x-access-token': token } });
}

deleteDepartment(id: any, token: any): Observable<any> {
  if (localStorage.getItem('x-access-token')) {
    token = localStorage.getItem('x-access-token');
  }
  return this.http.delete(`${baseUrl}/${id}`, { headers: { 'x-access-token': token } });
}

deleteSelected(ids: any, token: any): Observable<any> {
  if (localStorage.getItem('x-access-token')) {
    token = localStorage.getItem('x-access-token');
  }
  return this.http.post(`${baseUrl}/deleteSelected`, ids, { headers: { 'x-access-token': token } });
}

changeStatus(id: any, status: any, token: any): Observable<any> {
  if (localStorage.getItem('x-access-token')) {
    token = localStorage.getItem('x-access-token');
  }
  return this.http.get(`${baseUrl}/${id}?status=${status}`, { headers: { 'x-access-token': token } });
}

}
