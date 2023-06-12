import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { WorkTime } from '../../../models/works/work-time/work-time.model';
@Injectable({
  providedIn: 'root'
})
export class WorkTimeService {
private url = 'http://localhost:3000/work_time';
constructor(private http: HttpClient) { }
getAll(token: any): Observable<WorkTime[]> {
  if (localStorage.getItem('x-access-token')) {
    token = localStorage.getItem('x-access-token');
  }
  return this.http.get<WorkTime[]>(this.url, { headers: { 'x-access-token': token } });
}

get(id: any,token: any): Observable<WorkTime> {
  if (localStorage.getItem('x-access-token')) {
    token = localStorage.getItem('x-access-token');
  }
  return this.http.get(`${this.url}/${id}`, { headers: { 'x-access-token': token } });
}

create(data: any,token: any): Observable<any> {
  if (localStorage.getItem('x-access-token')) {
    token = localStorage.getItem('x-access-token');
  }
  return this.http.post(this.url, data, { headers: { 'x-access-token': token } });
}

update(id: any, data: any,token: any): Observable<any> {
  if (localStorage.getItem('x-access-token')) {
    token = localStorage.getItem('x-access-token');
  }
  return this.http.put(`${this.url}/${id}`, data, { headers: { 'x-access-token': token } });
}

delete(id: any,token: any): Observable<any> {
  if (localStorage.getItem('x-access-token')) {
    token = localStorage.getItem('x-access-token');
  }
  return this.http.delete(`${this.url}/${id}`, { headers: { 'x-access-token': token } });
}

deleteAll(token: any): Observable<any> {
  if (localStorage.getItem('x-access-token')) {
    token = localStorage.getItem('x-access-token');
  }
  return this.http.delete(this.url, { headers: { 'x-access-token': token } });
}

}
