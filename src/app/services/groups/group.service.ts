import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const baseUrl = 'http://localhost:3000/group';
@Injectable({
  providedIn: 'root'
})
export class GroupService {
temp: any;
constructor(private http: HttpClient) { }

getGroups(page: any,token: any): Observable<any> {
  if (localStorage.getItem('x-access-token')) {
    token = localStorage.getItem('x-access-token');
  }
  return this.http.get(`${baseUrl}?page=${page}`, { headers: { 'x-access-token': token } });
}

getGroupNotPaginate(token: any): Observable<any> {
  this.temp = 'getCompany';
  if (localStorage.getItem('x-access-token')) {
    token = localStorage.getItem('x-access-token');
  }
  return this.http.get(`${baseUrl}/${this.temp}`, { headers: { 'x-access-token': token } });
}

getGroup(id: any, token: any): Observable<any> {
  if (localStorage.getItem('x-access-token')) {
    token = localStorage.getItem('x-access-token');
  }
  return this.http.get(`${baseUrl}/${id}`, { headers: { 'x-access-token': token } });
}

editGroup(id: any, data: any, token: any): Observable<any> {
  if (localStorage.getItem('x-access-token')) {
    token = localStorage.getItem('x-access-token');
  }
  return this.http.put(`${baseUrl}/${id}`, data, { headers: { 'x-access-token': token } });
}

createGroup(data: any, token: any): Observable<any> {
  if (localStorage.getItem('x-access-token')) {
    token = localStorage.getItem('x-access-token');
  }
  return this.http.post(baseUrl, data, { headers: { 'x-access-token': token } });
}

deleteGroup(id: any, token: any): Observable<any> {
  if (localStorage.getItem('x-access-token')) {
    token = localStorage.getItem('x-access-token');
  }
  return this.http.delete(`${baseUrl}/${id}`, { headers: { 'x-access-token': token } });
}

deleteAll(token: any): Observable<any> {
  if (localStorage.getItem('x-access-token')) {
    token = localStorage.getItem('x-access-token');
  }
  return this.http.delete(baseUrl, { headers: { 'x-access-token': token } });
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
